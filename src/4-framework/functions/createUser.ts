import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputCreateUser } from '../../3-controller/serializers/inputCreateUser'
import { CreateUserOperator } from '../../3-controller/operators/createUserOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(CreateUserOperator)
  const body = JSON.parse(event?.body as string)
  const { birth_date } = body

  const payload = {
    ...body,
    birth_date: new Date(birth_date),
  }
  console.log('payload ', payload)
  const input = new InputCreateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
