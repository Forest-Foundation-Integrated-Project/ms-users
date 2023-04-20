import { injectable, inject } from 'inversify'
import { IUserRepository } from '../../2-business/repositories/iUserRepository'
import { IUserEntity, UserEntity } from '../../1-domain/entities/userEntity'
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

  async view(userId: string): Promise<IUserEntity> {
    const viewResponse = await this.userModel.findByPk(userId)

    delete viewResponse?.dataValues.password

    return viewResponse?.dataValues
  }

  async remove(userId: string): Promise<boolean> {
      const removeResponse = await this.userModel.destroy({
        where: {
          user_id: userId
        }
      });

      return true
  }

  async update(userEntity: IUserEntity): Promise<IUserEntity> {
    console.log("UserEntity: ", userEntity)

    await this.userModel.update(
      { name: userEntity.name,
        username: userEntity.username,
        password: userEntity.password,
        birthDate: userEntity.birthDate}, 
      {
      where: {
        user_id: userEntity.userId
      }
    }).then(response => {
      console.log("Response: ", response)
    }).catch(error => {
      console.log("Error: ", error)
    })

    const updateResponse = await this.userModel.findByPk(userEntity.userId)

    delete updateResponse?.dataValues.password

    return updateResponse?.dataValues
  }
}
