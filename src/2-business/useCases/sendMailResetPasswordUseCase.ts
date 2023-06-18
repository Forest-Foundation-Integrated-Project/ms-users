import { inject, injectable } from 'inversify'
import { Lambda } from 'aws-sdk'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { UserUpdateFailed } from '../module/errors/users'
import { InputSendMailResetPasswordDto, OutputSendMailResetPasswordDto } from '../dto/userDto'
import { createToken } from './handler/createToken'
import { ITokenRepository, ITokenRepositoryToken } from '../repositories/iTokenRepository'
import { OperationTypes } from '../../1-domain/entities/tokenEntity'

@injectable()
export class SendMailResetPasswordUseCase implements IUseCase<InputSendMailResetPasswordDto, OutputSendMailResetPasswordDto> {
  sendEmail = new Lambda

  public constructor(@inject(ITokenRepositoryToken) private tokenRepository: ITokenRepository) {}

  async exec(input: InputSendMailResetPasswordDto): Promise<OutputSendMailResetPasswordDto> {
    try {
      const tokenResult = await this.tokenRepository.create({
        token: createToken(),
        operationType: OperationTypes.sendMailResetPassword,
        email: input.email,
        expirationDate: Date.now() + 300000
      })

      console.log('token::result => ', tokenResult)

      const emailResponse = await this.sendEmail.invoke({
        FunctionName: 'ms-emails-dev-sendMail',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
          targetEmail: input.email,
          emailType: "resetPassword",
          token: tokenResult.token
        })
      }).promise()

      console.log('email::response => ', emailResponse)
      const payloadResponseString = JSON.parse(emailResponse.Payload as string)
      const payloadResponse = JSON.parse(payloadResponseString.body)

      return right(payloadResponse)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}