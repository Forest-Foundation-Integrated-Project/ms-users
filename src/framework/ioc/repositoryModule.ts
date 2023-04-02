import { ContainerModule, interfaces } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../../business/repositories/iUserRepository'
import { UserRepository } from '../repositories/userRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
