import express from 'express';
import { mikroorm } from './entities';
import ormConfig from './mikro-orm.config';
import { routes } from './controllers';
import bodyParser from 'body-parser';
import { passport } from './security/passport';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use(mikroorm(ormConfig));

app.use(routes);
