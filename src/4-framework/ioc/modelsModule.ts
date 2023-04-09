import { ContainerModule, interfaces } from 'inversify'

import { UserModel } from '../models/userModal'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
})
