import { pbkdf2Sync } from 'crypto'

export class HandlePassword {
  private readonly salt = 'd0ed82bf115eb69f9b0ed48117d88042'

  public hashPassword(plaintextPassword: string): string {
    const hash = pbkdf2Sync(plaintextPassword, this.salt,
      1000, 64, `sha512`).toString(`hex`)

    return hash
  }
}
