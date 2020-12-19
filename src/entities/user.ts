import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Issue } from './issue';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  enabled: boolean = true;

  @Enum()
  role: UserRole = UserRole.User;

  @OneToMany(() => Issue, issue => issue.user)
  issues = new Collection<Issue>(this);
}

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN',
}
