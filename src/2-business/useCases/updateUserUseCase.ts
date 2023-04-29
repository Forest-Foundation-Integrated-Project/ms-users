import { injectable, inject } from 'inversify'

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

      const user = await this.userRepository.update({
        user_id: input.user_id,
        name: input.name,
        birth_date: input.birth_date,
        gender: input.gender,
        ...(input.password && {password: handlePassword.hashPassword(input.password)}),
        email: input.email,
        phone: input.phone,
        city: input.city,
        university: input.university,
        user_bio: input.user_bio,
        contact_info: input.contact_info,
        role: input.role,
        active: input.active,
      })

      return right(user)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
