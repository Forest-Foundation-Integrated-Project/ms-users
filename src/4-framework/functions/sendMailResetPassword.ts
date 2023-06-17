import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputSendMailResetPassword } from '../../3-controller/serializers/inputSendMailResetPassword'
import { SendMailResetPasswordOperator } from '../../3-controller/operators/sendMailResetPasswordOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(SendMailResetPasswordOperator)
  const body = JSON.parse(event?.body as string)

  console.log('body::', body)
  const input = new InputSendMailResetPassword(body)
  console.log('email::', input.email)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
