import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'
import { UserNotFound, UserUpdateFailed } from '../module/errors/users'
import { InputResetPasswordDto, OutputResetPasswordDto } from '../dto/userDto'

@injectable()
export class ResetPasswordUseCase implements IUseCase<InputResetPasswordDto, OutputResetPasswordDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputResetPasswordDto): Promise<OutputResetPasswordDto> {
    try {
      const handlePassword = new HandlePassword()

      const user = await this.userRepository.resetPassword({
        email: input.email,
        password: handlePassword.hashPassword(input.password),
        confirmToken: input.confirmToken
      })

      if (!user) return left (UserNotFound)

      return right(!!user)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
