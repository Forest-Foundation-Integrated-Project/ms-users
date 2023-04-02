import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../business/useCases/createUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
})
