import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputConfirmTokenDto, OutputConfirmTokenDto } from '../dto/userDto'
import { OperationTypes } from '../../1-domain/entities/tokenEntity'
import { ITokenRepository, ITokenRepositoryToken } from '../repositories/iTokenRepository'
import { createToken } from './handler/createToken'
import { TokenConfirmationFailed, TokenNotFound, TokenValidationFailed } from '../module/errors/tokens'

@injectable()
export class ConfirmTokenUseCase implements IUseCase<InputConfirmTokenDto, OutputConfirmTokenDto> {
  public constructor(@inject(ITokenRepositoryToken) private tokenRepository: ITokenRepository) {}

  async exec(input: InputConfirmTokenDto): Promise<OutputConfirmTokenDto> {
    try {
      const tokenResult = await this.tokenRepository.find({
        token: input.token,
        operationType: OperationTypes.sendMailResetPassword,
        email: input.email
      })

      if (!tokenResult) return left (TokenNotFound)

      console.log('token::result => ', tokenResult)

      const validToken = (
        tokenResult.email == input.email &&
        tokenResult.operationType == OperationTypes.sendMailResetPassword &&
        new Date(tokenResult.expirationDate!).getTime() >= Date.now()
      )

      if (validToken) {
        const newTokenResult = await this.tokenRepository.create({
          token: createToken(),
          operationType: OperationTypes.resetPassword,
          email: input.email,
          expirationDate: Date.now() + 300000
        })

        console.log('new::token::result => ', newTokenResult)

        return right(newTokenResult)
      }

      return left(TokenValidationFailed)
    } catch (error) {
      return left(TokenConfirmationFailed)
    }
  }
}
