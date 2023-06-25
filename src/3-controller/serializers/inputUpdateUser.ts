import { IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional, IsUUID, IsIn, IsEmail, IsBase64 } from 'class-validator'

import { GenderTypes, IUserEntity } from '../../1-domain/entities/userEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsUUID()
  user_id!: string

  @IsOptional()
  @IsUUID()
  user_context_id?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  birth_date?: Date

  @IsOptional()
  @IsIn(Object.values(GenderTypes))
  gender?: GenderTypes

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsBase64()
  profileImage?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  university?: string

  @IsOptional()
  @IsString()
  user_bio?: string

  @IsOptional()
  @IsString()
  contact_info?: string

  @IsOptional()
  @IsString()
  role?: string

  @IsOptional()
  @IsBoolean()
  active?: boolean
}

export type OutputUpdateUser = Either<IError, IUserEntity>
