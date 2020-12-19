import { Router } from "express";
import { passport } from "../security/passport";
import { issuesRouter } from "./issues.controller";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);
