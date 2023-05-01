import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../2-business/useCases/createUserUseCase'
import { RemoveUserUseCase } from '../../2-business/useCases/removeUserUseCase'
import { UpdateUserUseCase } from '../../2-business/useCases/updateUserUseCase'
import { ViewUserUseCase } from '../../2-business/useCases/viewUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf()
  bind(ViewUserUseCase).toSelf()
  bind(RemoveUserUseCase).toSelf()
  bind(UpdateUserUseCase).toSelf()
})
