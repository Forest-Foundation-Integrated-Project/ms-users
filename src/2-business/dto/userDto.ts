import { IUserEntity } from "../../1-domain/entities/userEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateUserDto {
  name: string
  birthDate: Date
  username: string
  password: string
  enroll: string
}

export interface InputViewUserDto {
  userId: string
}

export interface InputRemoveUserDto {
  userId: string
}

export interface InputUpdateUserDto {
  userId: string
  name: string
  birthDate: Date
  username: string
  password: string
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
export type OutputViewUserDto = Either<IError, IUserEntity>
export type OutputRemoveUserDto = Either<IError, boolean>
export type OutputUpdateUserDto = Either<IError, IUserEntity>
