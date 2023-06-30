import { injectable } from "inversify";
import { IStorageService } from "../../2-business/services/iStorageService";
import { S3 } from 'aws-sdk';
import { Either, left, right } from "../shared/either";
import { FileExtensionIsNotSupported, ImageUploadFailed } from "../../2-business/module/errors/users";
import { IError } from "../shared/iError";
import { InputUpdateUserDto } from "../../2-business/dto/userDto";

@injectable()
export class StorageService implements IStorageService {
  private readonly s3: S3

  constructor() {
    this.s3 = new S3()
  }

  async upload(input: InputUpdateUserDto): Promise<Either<IError, string>> {
    console.log('profile::image::charAt(0) => ', input.profileImage?.charAt(0))

    let imageExtension
    switch (input.profileImage?.charAt(0)) {
      case '/':
        imageExtension = '.jpg';
        break;
      case 'i':
        imageExtension = '.png';
        break;
      default:
        return left(FileExtensionIsNotSupported)
    }

    const imageName = `${input.user_id}-image${imageExtension}`
    const params = {
      Bucket: `${process.env.IMAGES_BUCKET_NAME}`,
      Key: imageName,
      Body: Buffer.from(input.profileImage, "base64"),
      ACL: 'public-read'
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
