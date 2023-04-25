import { injectable, inject } from 'inversify'
import { IUserRepository } from '../../2-business/repositories/iUserRepository'
import { IUserEntity } from '../../1-domain/entities/userEntity'
import { UserModel } from '../models/userModel'

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async create(userEntity: IUserEntity): Promise<IUserEntity> {
    const createResponse = await this.userModel.create({
      //user_id: userEntity.user_id,
      name: userEntity.name,
      birth_date: userEntity.birth_date,
      gender: userEntity.gender,
      password: userEntity.password,
      email: userEntity.email,
      phone: userEntity.phone,
      user_bio: userEntity.user_bio,
      contact_info: userEntity.contact_info,
      role: userEntity.role,
      active: userEntity.active,
    })

    delete createResponse.dataValues.password

    return createResponse.dataValues
  }

  async view(view_id: string): Promise<IUserEntity> {
    const viewResponse = await this.userModel.findByPk(view_id)

    delete viewResponse?.dataValues.password

    return viewResponse?.dataValues
  }

  async remove(remove_id: string): Promise<boolean> {
      const removeResponse = await this.userModel.destroy({
        where: {
          user_id: remove_id
        }
      });

      console.log('Remove Response: ', removeResponse)
      
      // Verificar o valor de removeResponse para alterar o retorno da função remove
      return true
  }

  async update(userEntity: IUserEntity): Promise<IUserEntity> {
    console.log("UserEntity: ", userEntity)

    await this.userModel.update(
      { name: userEntity.name,
        birth_date: userEntity.birth_date,
        gender: userEntity.gender,
        password: userEntity.password,
        email: userEntity.email,
        phone: userEntity.phone,
        user_bio: userEntity.user_bio,
        contact_info: userEntity.contact_info,
        role: userEntity.role,
        active: userEntity.active},
      {
      where: {
        user_id: userEntity.user_id
      }
    }).then(response => {
      console.log("Response: ", response)
    }).catch(error => {
      console.log("Error: ", error)
    })

    const updateResponse = await this.userModel.findByPk(userEntity.user_id)

    delete updateResponse?.dataValues.password

    return updateResponse?.dataValues
  }
}