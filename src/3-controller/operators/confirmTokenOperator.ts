import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputConfirmToken, OutputConfirmToken } from '../serializers/inputConfirmToken'
import { ConfirmTokenUseCase } from '../../2-business/useCases/confirmTokenUseCase'

@injectable()
export class ConfirmTokenOperator extends AbstractOperator<InputConfirmToken, OutputConfirmToken> {
  public constructor(@inject(ConfirmTokenUseCase) private resetPasswordUseCase: ConfirmTokenUseCase) {
    super()
  }

  protected async run(input: InputConfirmToken): Promise<OutputConfirmToken> {
    const result = await this.resetPasswordUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
