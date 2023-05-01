import { injectable, inject } from 'inversify'
import { ViewUserUseCase } from '../../2-business/useCases/viewUserUseCase'

import { left, right } from '../../4-framework/shared/either'
import { InputViewUser, OutputViewUser } from '../serializers/inputViewUser'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class ViewUserOperator extends AbstractOperator<InputViewUser, OutputViewUser> {
  public constructor(@inject(ViewUserUseCase) private viewUserUseCase: ViewUserUseCase) {
    super()
  }

  protected async run(input: InputViewUser): Promise<OutputViewUser> {
    const result = await this.viewUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
