import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputResetPassword } from '../../3-controller/serializers/inputResetPassword'
import { ResetPasswordOperator } from '../../3-controller/operators/resetPasswordOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ResetPasswordOperator)
  const path = event.pathParameters
  const body = JSON.parse(event?.body as string)

  const payload = {
    ...body,
    user_id: path?.user_id
  }

  const input = new InputResetPassword(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
