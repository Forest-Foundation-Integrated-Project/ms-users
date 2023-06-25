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
  const body = JSON.parse(event?.body as string)
  const { birth_date } = body
  const payload = {
    ...body,
    ...(birth_date && { birth_date: new Date(birth_date) }),
    ...(event?.requestContext?.authorizer?.userId && {
      user_context_id: event.requestContext.authorizer.userId
    }),
    user_context_id: 'd5fe244d-2e69-4efe-94bc-d3f363532f03'
  }

  const input = new InputUpdateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
