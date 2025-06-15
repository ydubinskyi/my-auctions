import * as bcrypt from 'bcrypt';

export async function hashString(plainText: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainText, salt);
}

export function compareHash(plainText: string, hash: string) {
  return bcrypt.compare(plainText, hash);
}
