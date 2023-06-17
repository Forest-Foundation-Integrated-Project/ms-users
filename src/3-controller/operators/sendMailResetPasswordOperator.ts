import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputSendMailResetPassword, OutputSendMailResetPassword } from '../serializers/inputSendMailResetPassword'
import { SendMailResetPasswordUseCase } from '../../2-business/useCases/sendMailResetPasswordUseCase'

@injectable()
export class SendMailResetPasswordOperator extends AbstractOperator<InputSendMailResetPassword, OutputSendMailResetPassword> {
  public constructor(@inject(SendMailResetPasswordUseCase) private sendMailResetPasswordUseCase: SendMailResetPasswordUseCase) {
    super()
  }

  protected async run(input: InputSendMailResetPassword): Promise<OutputSendMailResetPassword> {
    const result = await this.sendMailResetPasswordUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
