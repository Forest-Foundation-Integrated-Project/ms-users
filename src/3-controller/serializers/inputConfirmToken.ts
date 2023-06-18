import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { ITokenEntity } from '../../1-domain/entities/tokenEntity'

export class InputConfirmToken extends Validatable<InputConfirmToken> {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(6)
  token!: string
}

export type OutputConfirmToken = Either<IError, ITokenEntity>
