import { ContainerModule, interfaces } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../../2-business/repositories/iUserRepository'
import { UserRepository } from '../repositories/userRepository'
import { ITokenRepository, ITokenRepositoryToken } from '../../2-business/repositories/iTokenRepository'
import { TokenRepository } from '../repositories/tokenRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<ITokenRepository>(ITokenRepositoryToken).to(TokenRepository)
})
