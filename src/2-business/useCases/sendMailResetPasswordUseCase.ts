import { injectable } from 'inversify'
import { Lambda } from 'aws-sdk'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { UserUpdateFailed } from '../module/errors/users'
import { InputSendMailResetPasswordDto, OutputSendMailResetPasswordDto } from '../dto/userDto'
import { createToken } from './handler/createToken'

@injectable()
export class SendMailResetPasswordUseCase implements IUseCase<InputSendMailResetPasswordDto, OutputSendMailResetPasswordDto> {
  sendEmail = new Lambda

  async exec(input: InputSendMailResetPasswordDto): Promise<OutputSendMailResetPasswordDto> {
    try {
      const emailResponse = await this.sendEmail.invoke({
        FunctionName: 'ms-emails-dev-sendMail',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
          targetEmail: input.email,
          emailType: "resetPassword",
          token: createToken()
        })
      }).promise()

      console.log('email::response => ', emailResponse)
      const passwordResponseString = JSON.parse(emailResponse.Payload as string)
      const passwordResponse = JSON.parse(passwordResponseString.body)

      return right(passwordResponse)
    } catch (error) {
      return left(UserUpdateFailed)
    }
  }
}
