import _passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback,
} from 'passport-jwt';
import { secret } from './secret';

export const passport = new _passport.Passport();

const opts: StrategyOptions = {
  jwtFromRequest: (req) => {
    let token: string | null = null;
    if (req && req.cookies) {
      token = req.cookies['token'];
    }
    if (req && !token) {
      token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
    return token;
  },
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(opts, (async (jwt_payload, done) => {
    done(null, {
      id: jwt_payload.sub,
      role: jwt_payload.role,
    });
  }) as VerifyCallback),
);

