import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '../../controller/operators/createUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
})
