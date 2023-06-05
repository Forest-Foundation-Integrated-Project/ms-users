import { injectable } from 'inversify'
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

import { IIdentityService, IUserIdentity } from '../../2-business/services/iIdentityService'
import { IUserIdentityResponse } from '../../2-business/services/iIdentityService'
import { Either, left, right } from '../shared/either'
import { CreationUserIdentityServiceFail } from '../../2-business/module/errors/users';
import { IError } from '../shared/iError';

@injectable()
export class IdentityService implements IIdentityService {
  async createUserIdentity(userIdentity: IUserIdentity): Promise<Either<IError, IUserIdentityResponse>> {
    const encoder = new TextEncoder();

    try {
      const lambdaClient = new LambdaClient({
        region: process.env.REGION,
      });

      const invokeParams = {
        FunctionName: process.env.CREATE_IDENTITY,
        Payload: encoder.encode(JSON.stringify(userIdentity)),
      };

      const response = await lambdaClient.send(new InvokeCommand(invokeParams))
        .then(data => {
          const responseString = Buffer.from(data.Payload!).toString('utf8')

          return JSON.parse(JSON.parse(responseString).body)
        })
        .catch(err => {
          throw Error(err)
        });

      return right(response)
    } catch (error) {
      console.log('IdentityService::createUserIdentity => ', error)
      return left(CreationUserIdentityServiceFail(error!))
    }
  }
}
