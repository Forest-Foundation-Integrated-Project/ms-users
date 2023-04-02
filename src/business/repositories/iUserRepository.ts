import { IUserEntity } from "../../domain/entities/userEntity"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
}
