import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputResetPassword, OutputResetPassword } from '../serializers/inputResetPassword'
import { ResetPasswordUseCase } from '../../2-business/useCases/resetPasswordUseCase'

@injectable()
export class ResetPasswordOperator extends AbstractOperator<InputResetPassword, OutputResetPassword> {
  public constructor(@inject(ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase) {
    super()
  }

  protected async run(input: InputResetPassword): Promise<OutputResetPassword> {
    const result = await this.resetPasswordUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
