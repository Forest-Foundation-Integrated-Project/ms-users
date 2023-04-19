import { injectable, inject } from 'inversify'
import { RemoveUserUseCase } from '../../2-business/useCases/removeUserUseCase'

import { left, right } from '../../4-framework/shared/either'
import { InputRemoveUser, OutputRemoveUser } from '../serializers/inputRemoveUser'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class RemoveUserOperator extends AbstractOperator<InputRemoveUser, OutputRemoveUser> {
  public constructor(@inject(RemoveUserUseCase) private removeUserUseCase: RemoveUserUseCase) {
    super()
  }

  protected async run(input: InputRemoveUser): Promise<OutputRemoveUser> {
    const result = await this.removeUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
