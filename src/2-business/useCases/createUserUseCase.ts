import { injectable, inject } from 'inversify'
import { Lambda } from 'aws-sdk'

import { UserEntity } from '../../1-domain/entities/userEntity'
import { HandlePassword } from './handler/handlerPassword'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { IIdentityService, IIdentityServiceToken } from '../services/iIdentityService'
import { UserCreationFailed } from '../module/errors/users'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { createToken } from './handler/createToken'
import { OperationTypes } from '../../1-domain/entities/tokenEntity'
import { ITokenRepository, ITokenRepositoryToken } from '../repositories/iTokenRepository'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  sendEmail = new Lambda

  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IIdentityServiceToken) private identityService: IIdentityService,
    @inject(ITokenRepositoryToken) private tokenRepository: ITokenRepository
  ) { }

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const handlePassword = new HandlePassword()
      const hashedPassword = handlePassword.hashPassword(input.password)

      const userResult = UserEntity.create({
        name: input.name,
        birth_date: input.birth_date,
        gender: input.gender,
        password: hashedPassword,
        email: input.email,
        phone: input.phone,
        city: input.city,
        university: input.university,
        user_bio: input.user_bio,
        contact_info: input.contact_info,
        role: input.role,
        active: input.active,
      })

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const userCreation = await this.userRepository.create(userResult.value.export())

      if (userCreation?.user_id) {
        const createUserIdentity = await this.identityService.createUserIdentity({
          email: userCreation.email,
          name: userCreation.name,
          password: input.password,
          user_id: userCreation.user_id
        })
        console.log('createUserIdentity => ', createUserIdentity)

        if (createUserIdentity.isLeft() || !createUserIdentity.value.enabled) {
          await this.userRepository.delete(userCreation.user_id)
          throw Error()
        }

      }

      const emailResponse = await this.sendEmail.invoke({
        FunctionName: 'ms-emails-dev-sendMail',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
          targetEmail: input.email,
          emailType: "confirmEmail",
          token: createToken()
        })
      }).promise()

      console.log('email::response => ', emailResponse)

      if (emailResponse) {
        const tokenResult = await this.tokenRepository.create({
          token: createToken(),
          operationType: OperationTypes.confirmEmail,
          email: input.email,
          expirationDate: Date.now() + 86400000
        })

        console.log('token::result => ', tokenResult)
      }

      return right(userCreation)
    } catch (error) {
      console.log('create::error => ', error)
      return left(UserCreationFailed)
    }
  }
}
