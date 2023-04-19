import { injectable, inject } from 'inversify'

import { UserEntity } from '../../1-domain/entities/userEntity'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { UserUpdateFailed } from '../module/errors/users'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'
import { InputUpdateUserDto, OutputUpdateUserDto } from '../dto/userDto'

@injectable()
export class UpdateUserUseCase implements IUseCase<InputUpdateUserDto, OutputUpdateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const handlePassword = new HandlePassword()
      const hashedPassword = handlePassword.hashPassword(input.password)

      const user = await this.userRepository.update({
        userId: input.userId,
        name: input.name,
        username: input.username,
        password: hashedPassword,
        birthDate: input.birthDate,
      })

      return right(user)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
