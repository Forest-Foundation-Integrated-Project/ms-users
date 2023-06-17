import { IsEmail, IsNotEmpty } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputSendMailResetPassword extends Validatable<InputSendMailResetPassword> {
  @IsNotEmpty()
  @IsEmail()
  email!: string
}

export type OutputSendMailResetPassword = Either<IError, boolean>
