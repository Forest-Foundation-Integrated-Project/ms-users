import { ContainerModule, interfaces } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../../2-business/repositories/iUserRepository'
import { UserRepository } from '../repositories/userRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
