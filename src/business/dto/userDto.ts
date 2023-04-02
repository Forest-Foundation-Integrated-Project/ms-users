import { IUserEntity } from "../../domain/entities/userEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputCreateUserDto {
  name: string
  birthDate: Date
  username: string
  password: string
  enroll: string
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
