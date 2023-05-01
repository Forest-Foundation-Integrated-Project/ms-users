import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { UserNotFound, UserRemovalFailed } from '../module/errors/users'
import { InputRemoveUserDto, OutputRemoveUserDto } from '../dto/userDto'

@injectable()
export class RemoveUserUseCase implements IUseCase<InputRemoveUserDto, OutputRemoveUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputRemoveUserDto): Promise<OutputRemoveUserDto> {
    try {
      const userResult = await this.userRepository.remove(input.user_id)
      
      if (!userResult) return left (UserNotFound)
      
      return right(userResult)
    } catch (error) {
      return left(UserRemovalFailed)
    }
  }
}
