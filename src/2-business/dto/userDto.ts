import { GenderTypes, IUserEntity } from "../../1-domain/entities/userEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateUserDto {
  name: string
  birth_date: Date
  gender: GenderTypes
  password: string
  email: string
  phone?: string
  city: string
  university: string
  user_bio?: string
  contact_info?: string
  role?: string
  active?: boolean
}

export interface InputViewUserDto {
  user_id: string
}

export interface InputRemoveUserDto {
  user_id: string
}

export interface InputUpdateUserDto {
  user_id: string
  user_context_id?: string
  name?: string
  birth_date?: Date
  gender?: GenderTypes
  password?: string
  email?: string
  phone?: string
  city?: string
  university?: string
  user_bio?: string
  contact_info?: string
  role?: string
  active?: boolean
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
export type OutputViewUserDto = Either<IError, IUserEntity>
export type OutputRemoveUserDto = Either<IError, boolean>
export type OutputUpdateUserDto = Either<IError, IUserEntity>
