import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputResetPassword extends Validatable<InputResetPassword> {
  @IsNotEmpty()
  @IsUUID()
  user_id!: string

  @IsOptional()
  @IsUUID()
  user_context_id?: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsEmail()
  email!: string
}

export type OutputResetPassword = Either<IError, boolean>
