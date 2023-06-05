import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '../../3-controller/operators/createUserOperator'
import { RemoveUserOperator } from '../../3-controller/operators/removeUserOperator'
import { UpdateUserOperator } from '../../3-controller/operators/updateUserOperatos'
import { ViewUserOperator } from '../../3-controller/operators/viewUserOperator'
import { ResetPasswordOperator } from '../../3-controller/operators/resetPasswordOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).toSelf()
  bind(ViewUserOperator).toSelf()
  bind(RemoveUserOperator).toSelf()
  bind(UpdateUserOperator).toSelf()
  bind(ResetPasswordOperator).toSelf()
})
