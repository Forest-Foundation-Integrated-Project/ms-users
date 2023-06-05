import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputRemoveUser } from '../../3-controller/serializers/inputRemoveUser'
import { RemoveUserOperator } from '../../3-controller/operators/removeUserOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(RemoveUserOperator)
  const body = event.pathParameters

  const input = new InputRemoveUser({
    ...body, ...(event?.requestContext?.authorizer?.userId && {
      user_context_id: event.requestContext.authorizer.userId
    })
  })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})

// O método de remoção deve ser alterado para um soft delete.
// Ao invés de remover o usuário do banco de dados, o valor boolean "active" da tabela "users" será alterado para falso.
