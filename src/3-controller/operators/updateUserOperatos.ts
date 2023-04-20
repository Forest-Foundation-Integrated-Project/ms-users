import { injectable, inject } from 'inversify'
import { UpdateUserUseCase } from '../../2-business/useCases/updateUserUseCase'

import { left, right } from '../../4-framework/shared/either'
import { InputUpdateUser, OutputUpdateUser } from '../serializers/inputUpdateUser'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class UpdateUserOperator extends AbstractOperator<InputUpdateUser, OutputUpdateUser> {
  public constructor(@inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  protected async run(input: InputUpdateUser): Promise<OutputUpdateUser> {
    const result = await this.updateUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
