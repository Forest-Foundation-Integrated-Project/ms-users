export enum OperationTypes {
  confirmEmail = 'confirmEmail',
  resetPassword = 'resetPassword',
  sendMailResetPassword = 'sendMailResetPassword'
}

export interface ITokenEntity {
  token: string
  operationType: OperationTypes
  email: string
  expirationDate?: number
  createdAt?: Date
  updatedAt?: Date
}
