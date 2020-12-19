import crypto from 'crypto';
import { promisify } from 'util';

export async function hashPassword(password: string) {
  const hash = await promisify(crypto.pbkdf2)(password, 'cica', 10000, 64, 'sha512');
  return hash.toString('hex');
}
