import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export const IIdentityServiceToken = Symbol.for('IIdentityService')

export interface IUserIdentity {
  email: string
  password: string
  user_id: string,
  name: string
}

export interface IUserIdentityResponse {
  email: string
  enabled: boolean
}

export interface IIdentityService {
  createUserIdentity(userEntity: IUserIdentity): Promise<Either<IError, IUserIdentityResponse>>
}
