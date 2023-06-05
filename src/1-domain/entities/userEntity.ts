// import { v4 as uuid } from 'uuid'
import { randomUUID } from 'crypto'

import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUserEntity {
  user_id?: string
  name: string
  birth_date: Date
  gender: GenderTypes
  password?: string
  email: string
  phone?: string
  city: string
  university: string
  user_bio?: string
  contact_info?: string
  role?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  emailCheck?: boolean
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: IUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity({
      ...props,
      user_id: randomUUID(),
    })

    return right(user)
  }
}
