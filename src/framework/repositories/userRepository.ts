import { injectable, inject } from 'inversify'
import { IUserRepository } from '../../business/repositories/iUserRepository'
import { IUserEntity } from '../../domain/entities/userEntity'
import { UserModel } from '../models/userModal'

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async create(userEntity: IUserEntity): Promise<IUserEntity> {
    const createResponse = await this.userModel.create({
      user_id: userEntity.userId,
      name: userEntity.name,
      username: userEntity.username,
      password: userEntity.password,
      enroll: userEntity.enroll,
      birth_date: userEntity.birthDate,
    })

    delete createResponse.dataValues.password

    return createResponse.dataValues
  }
}
