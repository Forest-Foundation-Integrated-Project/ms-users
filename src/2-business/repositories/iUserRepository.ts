import { IUserEntity } from "../../1-domain/entities/userEntity"
import { InputUpdateUserDto } from "../dto/userDto"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  view(user_id: string): Promise<IUserEntity>
  remove(user_id: string): Promise<boolean>
  update(userEntity: InputUpdateUserDto): Promise<IUserEntity>
}

// Uma possível melhoria a este código seria a criação de outra interface para o método update, ao invés da userEntity.
