import { IsNotEmpty, IsString, IsDate, Matches, isNotEmpty, IsBoolean, IsOptional } from 'class-validator'

import { IUserEntity } from '../../1-domain/entities/userEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputCreateUser extends Validatable<InputCreateUser> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsDate()
  birth_date!: Date

  @IsNotEmpty()
  @IsString()
  gender!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsNotEmpty()
  @IsString()
  city!: string

  @IsNotEmpty()
  @IsString()
  university!: string

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

export type OutputCreateUser = Either<IError, IUserEntity>
