import { IsNotEmpty, IsString, IsDate, Matches, isNotEmpty, IsBoolean } from 'class-validator'

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
  birthDate!: Date

  @IsNotEmpty()
  @IsString()
  gender!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsString()
  phone!: string

  @IsString()
  user_bio!: string

  @IsString()
  contact_info!: string

  @IsNotEmpty()
  @IsString()
  role!: string

  @IsNotEmpty()
  @IsBoolean()
  active!: boolean
}

export type OutputCreateUser = Either<IError, IUserEntity>
