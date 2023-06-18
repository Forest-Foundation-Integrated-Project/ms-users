import { injectable, inject } from 'inversify'
import { ITokenEntity } from '../../1-domain/entities/tokenEntity'
import { TokenModel } from '../models/tokenModel'
import { ITokenRepository } from '../../2-business/repositories/iTokenRepository'

enum Prefixes {
  tokens = 'TOKENS'
}

@injectable()
export class TokenRepository implements ITokenRepository {
  public constructor(@inject(TokenModel) private tokenModel: typeof TokenModel) { }
  private readonly pk = Prefixes.tokens

  async create(input: ITokenEntity): Promise<ITokenEntity> {
    const pk = Prefixes.tokens
    const sk = input.token

    const result = await this.tokenModel.create({
      pk,
      sk,
      ...input
    })

    delete result.pk
    delete result.sk

    return result
  }
}
