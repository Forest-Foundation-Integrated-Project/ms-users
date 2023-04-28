import { IsNotEmpty, IsString, IsDate, Matches, IsBoolean, IsOptional } from 'class-validator'

import { IUserEntity } from '../../1-domain/entities/userEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsString()
  user_id!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  birth_date?: Date

  @IsOptional()
  @IsString()
  gender?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

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
