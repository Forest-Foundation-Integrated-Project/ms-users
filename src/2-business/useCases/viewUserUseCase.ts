import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputViewUserDto, OutputViewUserDto } from '../dto/userDto'
import { UserViewingFailed } from '../module/errors/users'

@injectable()
export class ViewUserUseCase implements IUseCase<InputViewUserDto, OutputViewUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputViewUserDto): Promise<OutputViewUserDto> {
    try {
      const userResult = await this.userRepository.view(input.user_id)

    //   if (userResult.isLeft()) {
    //     return left(UserCreationFailed)
    //   }

      return right(userResult)
    } catch (error) {
      return left(UserViewingFailed)
    }
  }
}
