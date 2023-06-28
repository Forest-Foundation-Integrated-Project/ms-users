import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { ImageUploadFailed, UserIdentityCannotBeValidated, UserNotFound, UserUpdateFailed } from '../module/errors/users'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'
import { InputUpdateUserDto, OutputUpdateUserDto } from '../dto/userDto'
import { IStorageService, IStorageServiceToken } from '../services/iStorageService'

@injectable()
export class UpdateUserUseCase implements IUseCase<InputUpdateUserDto, OutputUpdateUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IStorageServiceToken) private storageService: IStorageService)
    { }

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const handlePassword = new HandlePassword()

      if (input.user_id !== input.user_context_id) {
        return left(UserIdentityCannotBeValidated)
      }

      let userImage
      if (!!input.profile_image) {
        const imageUploadResult = await this.storageService.upload(input)
        console.log('image::upload::result => ', imageUploadResult)

        if (imageUploadResult.isLeft()) {return left(ImageUploadFailed)}

        userImage = imageUploadResult.value
        console.log('user::image => ', userImage)
      }

      const user = await this.userRepository.update({
        user_id: input.user_id,
        name: input.name,
        birth_date: input.birth_date,
        gender: input.gender,
        ...(input.password && { password: handlePassword.hashPassword(input.password) }),
        email: input.email,
        phone: input.phone,
        profile_image: userImage,
        city: input.city,
        university: input.university,
        user_bio: input.user_bio,
        contact_info: input.contact_info,
        role: input.role,
        active: input.active,
      })

      if (!user) return left(UserNotFound)

      return right(user)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
