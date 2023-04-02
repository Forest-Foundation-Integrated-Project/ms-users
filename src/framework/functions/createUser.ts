import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputCreateUser } from '../../controller/serializers/inputCreateUser'
import { CreateUserOperator } from '../../controller/operators/createUserOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(CreateUserOperator)
  const body = JSON.parse(event?.body as string)
  const { birthDate } = body

  const payload = {
    ...body,
    birthDate: new Date(birthDate),
  }

  const input = new InputCreateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result)
})
