import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '../../3-controller/operators/createUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
})
