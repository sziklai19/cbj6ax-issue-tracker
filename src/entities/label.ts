import { Property, Entity, PrimaryKey, Collection, ManyToMany } from "@mikro-orm/core";
import { Issue } from "./issue";

@Entity()
export class Label {

  @PrimaryKey()
  id!: number;

  @Property()
  text!: string;

  @ManyToMany(() => Issue, issue => issue.labels)
  issues = new Collection<Issue>(this);

}