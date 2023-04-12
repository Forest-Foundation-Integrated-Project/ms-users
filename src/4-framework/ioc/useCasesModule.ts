import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../2-business/useCases/createUserUseCase'
import { ViewUserUseCase } from '../../2-business/useCases/viewUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
  bind(ViewUserUseCase).to(ViewUserUseCase)
})
