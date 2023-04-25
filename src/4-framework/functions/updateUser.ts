import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { UpdateUserOperator } from '../../3-controller/operators/updateUserOperatos'
import { InputUpdateUser } from '../../3-controller/serializers/inputUpdateUser'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateUserOperator)
  const path = event.pathParameters
  const body = JSON.parse(event?.body as string)
  const { birthDate } = body

  const payload = {
    ...body,
    birthDate: new Date(birthDate),
    userId: path?.userId
  }

  const input = new InputUpdateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})