import { injectable } from "inversify";
import { IStorageService } from "../../2-business/services/iStorageService";
import { S3 } from 'aws-sdk';
import { IUserEntity } from "../../1-domain/entities/userEntity";
import { Either, left, right } from "../shared/either";
import { ImageUploadFailed } from "../../2-business/module/errors/users";
import { IError } from "../shared/iError";
import { InputUpdateUserDto } from "../../2-business/dto/userDto";

@injectable()
export class StorageService implements IStorageService {
  private readonly s3: S3

  constructor() {
    this.s3 = new S3()
  }

  async upload(input: InputUpdateUserDto): Promise<Either<IError, string>> {
    console.log('profile::image => ', input.profileImage)

    const imageName = `${input.user_id}-image`
    const params = {
      Bucket: 'users-images-devi',
      Key: imageName,
      Body: input.profileImage
    }

    try {
      const result = await this.s3.upload(params).promise()
      console.log(result)

      return right(`https://products-images-dev.s3.amazonaws.com/${imageName}`)
    } catch (error) {
      console.log(error)

      return left(ImageUploadFailed)
    }
  }
}
