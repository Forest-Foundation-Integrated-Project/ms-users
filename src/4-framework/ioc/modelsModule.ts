import { ContainerModule, interfaces } from 'inversify'

import { UserModel } from '../models/userModel'
import { TokenModel } from '../models/tokenModel'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
  bind<typeof TokenModel>(TokenModel).toConstructor(TokenModel)
})
