import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { Issue } from "./entities/issue";
import { User as ApplicationUser, UserRole } from "./entities/user";

declare global {
  namespace Express {

    interface User {
      id: number;
      role: UserRole;
    }

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      issuesRepository?: EntityRepository<Issue>;
      userRepository?: EntityRepository<ApplicationUser>;
    }
  }
}
