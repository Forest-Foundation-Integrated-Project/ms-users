import { IUserEntity } from "../../1-domain/entities/userEntity"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  view(userId: string): Promise<IUserEntity>
  remove(userId: string): Promise<boolean>
  update(userEntity: IUserEntity): Promise<IUserEntity>
}

// Uma possível melhoria a este código seria a criação de outra interface para o método update, ao invés da userEntity.
