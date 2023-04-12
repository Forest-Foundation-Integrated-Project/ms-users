import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '../../3-controller/operators/createUserOperator'
import { ViewUserOperator } from '../../3-controller/operators/viewUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
  bind(ViewUserOperator).to(ViewUserOperator)
})
