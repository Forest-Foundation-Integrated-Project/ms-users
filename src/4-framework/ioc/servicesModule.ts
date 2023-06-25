import { ContainerModule, interfaces } from 'inversify'

import { IIdentityService } from '../../2-business/services/iIdentityService'
import { IIdentityServiceToken } from '../../2-business/services/iIdentityService'
import { IdentityService } from '../services/identityService'
import { IStorageService, IStorageServiceToken } from '../../2-business/services/iStorageService'
import { StorageService } from '../services/storageService'

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IIdentityService>(IIdentityServiceToken).to(IdentityService)
  bind<IStorageService>(IStorageServiceToken).to(StorageService)
})
