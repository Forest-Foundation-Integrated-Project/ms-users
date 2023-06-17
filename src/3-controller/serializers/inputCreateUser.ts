import { IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional, IsIn, IsEmail } from 'class-validator'

import { GenderTypes, IUserEntity } from '../../1-domain/entities/userEntity'
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
  @IsIn(Object.values(GenderTypes))
  gender!: GenderTypes

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsEmail()
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
