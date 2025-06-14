import * as bcrypt from 'bcrypt';

export function hashString(plainText: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(plainText, salt);
}

export function compareHash(plainText: string, hash: string) {
  return bcrypt.compareSync(plainText, hash);
}
