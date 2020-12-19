import { Entity, PrimaryKey, Property, Enum, Collection, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { Label } from './label';
import { User } from './user';

@Entity()
export class Issue {

  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property()
  title!: string;

  @Property()
  place!: string;

  @Enum()
  status: IssueStatus = IssueStatus.NEW;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @ManyToMany(() => Label, 'issues', { owner: true })
  labels = new Collection<Label>(this);

  @ManyToOne(() => User)
  user!: User;
}

export enum IssueStatus {
  NEW = 'NEW',
  DOING = 'DOING',
  DONE = 'DONE',
}
