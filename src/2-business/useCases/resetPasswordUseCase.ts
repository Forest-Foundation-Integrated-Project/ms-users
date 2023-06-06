import { injectable, inject } from 'inversify'
import { Lambda } from 'aws-sdk'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'
import { UserIdentityCannotBeValidated, UserNotFound, UserUpdateFailed } from '../module/errors/users'
import { InputResetPasswordDto, OutputResetPasswordDto } from '../dto/userDto'
import { createToken } from './handler/createToken'

@injectable()
export class ResetPasswordUseCase implements IUseCase<InputResetPasswordDto, OutputResetPasswordDto> {
  sendEmail = new Lambda

  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputResetPasswordDto): Promise<OutputResetPasswordDto> {
    try {
      const handlePassword = new HandlePassword()

      if (input.user_id !== input.user_context_id) {
        return left(UserIdentityCannotBeValidated)
      }

      const user = await this.userRepository.update({
        user_id: input.user_id,
        ...(input.password && {password: handlePassword.hashPassword(input.password)})
      })

      if (!user) return left (UserNotFound)

      const emailResponse = await this.sendEmail.invoke({
        FunctionName: 'ms-emails-dev-sendMail',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
          targetEmail: input.email,
          emailType: "resetPassword",
          token: createToken()
        })
      }).promise()

      console.log('email::response => ', emailResponse)

      return right(!!user)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
