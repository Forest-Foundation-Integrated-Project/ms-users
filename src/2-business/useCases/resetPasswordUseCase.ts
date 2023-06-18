import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../4-framework/shared/either'
import { HandlePassword } from './handler/handlerPassword'
import { IUseCase } from './iUseCase'
import { UserNotFound, UserUpdateFailed } from '../module/errors/users'
import { InputResetPasswordDto, OutputResetPasswordDto } from '../dto/userDto'
import { ITokenRepository, ITokenRepositoryToken } from '../repositories/iTokenRepository'
import { OperationTypes } from '../../1-domain/entities/tokenEntity'
import { TokenNotFound, TokenValidationFailed } from '../module/errors/tokens'

@injectable()
export class ResetPasswordUseCase implements IUseCase<InputResetPasswordDto, OutputResetPasswordDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(ITokenRepositoryToken) private tokenRepository: ITokenRepository
  ) { }

  async exec(input: InputResetPasswordDto): Promise<OutputResetPasswordDto> {
    try {
      const tokenResult = await this.tokenRepository.find({
        token: input.confirmToken,
        operationType: OperationTypes.resetPassword,
        email: input.email
      })

      if (!tokenResult) return left(TokenNotFound)

      console.log('token::result => ', tokenResult)

      const validToken = (
        tokenResult.email == input.email &&
        tokenResult.operationType == OperationTypes.resetPassword &&
        new Date(tokenResult.expirationDate!).getTime() >= Date.now()
      )

      if (validToken) {
        const handlePassword = new HandlePassword()

        const user = await this.userRepository.resetPassword({
          email: input.email,
          password: handlePassword.hashPassword(input.password),
          confirmToken: input.confirmToken
        })

        if (!user) return left(UserNotFound)

        return right(!!user)
      }

      return left(TokenValidationFailed)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
