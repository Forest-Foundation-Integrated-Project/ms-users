import { injectable, inject } from 'inversify'

import { UserEntity } from '../../domain/entities/userEntity'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { UserCreationFailed } from '../module/errors/users'
import { left, right } from '../../framework/shared/either'
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
        username: input.username,
        password: hashedPassword,
        birthDate: input.birthDate,
        enroll: input.enroll,
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
