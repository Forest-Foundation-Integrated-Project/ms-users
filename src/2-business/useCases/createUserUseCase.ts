import { injectable, inject } from 'inversify'

import { UserEntity } from '../../1-domain/entities/userEntity'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { UserCreationFailed } from '../module/errors/users'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

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
        user_bio: input.user_bio,
        contact_info: input.contact_info,
        role: input.role,
        active: input.active,
      })

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const user = await this.userRepository.create(userResult.value.export())

      return right(user)
    } catch (error) {
      return left(UserCreationFailed)
    }
  }
}
