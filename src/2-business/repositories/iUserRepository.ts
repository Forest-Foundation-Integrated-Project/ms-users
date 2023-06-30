import { IUserEntity } from "../../1-domain/entities/userEntity"
import { InputResetPasswordDto, InputUpdateUserDto } from "../dto/userDto"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  view(user_id: string): Promise<IUserEntity>
  remove(user_id: string): Promise<boolean>
  delete(user_id: string): Promise<boolean>
  update(userEntity: InputUpdateUserDto): Promise<IUserEntity>
  resetPassword(userDto: InputResetPasswordDto): Promise<boolean>
  checkEmail(email: string): Promise<boolean>
  getByEmail(email: string): Promise<IUserEntity>
}

// Uma possível melhoria a este código seria a criação de outra interface para o método update, ao invés da userEntity.
