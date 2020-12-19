import { wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { User } from '../entities/user';
import { generateJwt } from '../security/jwtGenerator';
import { hashPassword } from '../security/password-utils';

export const userRouter = Router();

userRouter
  .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(User);
    next();
  })
  .post('/register', async (req, res) => {
    const { username, password }: AuthenticationDto = req.body;
    let user = await req.userRepository!.findOne({ username });
    if (user) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);

    user = new User();
    wrap(user).assign({ username, password: hashedPassword });

    await req.userRepository!.persistAndFlush(user);
    return res.sendStatus(200);
  })
  .post('/login', async (req, res) => {
    const { username, password }: AuthenticationDto = req.body;
    const user = await req.userRepository!.findOne({ username });
    if (!user) {
      return res.sendStatus(401);
    }
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.sendStatus(401);
    }
    return res.send({'token': generateJwt(user)});
  });

interface AuthenticationDto {
  username: string;
  password: string;
}
