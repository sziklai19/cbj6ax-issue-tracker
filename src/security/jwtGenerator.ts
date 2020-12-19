import jsonwebtoken from 'jsonwebtoken';
import { User } from '../entities/user';
import { secret } from './secret';

export function generateJwt(user: User) {
  const payload = {
    sub: user.id,
    role: user.role,
  };

  const token = jsonwebtoken.sign(payload, secret);

  return token;
}
