// import { v4 as uuid } from 'uuid'
import { randomUUID } from 'crypto'

import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IUserEntity {
  userId?: string
  name: string
  username: string
  birthDate: Date
  password?: string
  enroll: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: IUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity({
      ...props,
      userId: randomUUID(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
