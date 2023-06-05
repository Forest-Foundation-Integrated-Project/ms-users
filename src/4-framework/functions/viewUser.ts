import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { ViewUserOperator } from '../../3-controller/operators/viewUserOperator'
import { InputViewUser } from '../../3-controller/serializers/inputViewUser'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ViewUserOperator)
  const body = event.pathParameters
  console.log('event => ', event)
  console.log('event => ', event.requestContext)

  if (event?.requestContext?.authorizer) {
    const authorizerData = event.requestContext.authorizer;
    console.log('Dados do authorizer:', authorizerData);
  }

  console.log('body => ', body)
  console.log('context => ', context)
  const input = new InputViewUser(body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})
