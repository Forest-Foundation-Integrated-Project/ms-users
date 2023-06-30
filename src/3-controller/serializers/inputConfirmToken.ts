import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { ITokenEntity, OperationTypes } from '../../1-domain/entities/tokenEntity'

export class InputConfirmToken extends Validatable<InputConfirmToken> {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsEnum(OperationTypes)
  operationType!: OperationTypes

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(6)
  token!: string
}

export type OutputConfirmToken = Either<IError, ITokenEntity>
