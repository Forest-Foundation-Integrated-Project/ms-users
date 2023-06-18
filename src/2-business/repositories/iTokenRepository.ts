import { ITokenEntity } from "../../1-domain/entities/tokenEntity"

export const ITokenRepositoryToken = Symbol.for('ITokenRepository')

export interface ITokenRepository {
  create(tokenEntity: ITokenEntity): Promise<ITokenEntity>
}
