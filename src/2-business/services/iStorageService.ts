import { IUserEntity } from "../../1-domain/entities/userEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"
import { InputUpdateUserDto } from "../dto/userDto"

export const IStorageServiceToken = Symbol.for('IStorageToken')

export interface IStorageService {
  upload(input: InputUpdateUserDto): Promise<Either<IError, string>>
}
