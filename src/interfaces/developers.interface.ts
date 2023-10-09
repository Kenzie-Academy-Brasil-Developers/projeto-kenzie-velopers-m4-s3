import { QueryResult } from "pg";

export type Developers = {
  id: number;
  name: string;
  email: string;
};

export type DevelopersCreate = Omit<Developers, "id">;
export type DevelopersRead = Developers[];
export type DevelopersUpdate = Partial<Developers>;
export type DevelopersResult = QueryResult<Developers>;

export interface DevelopersCreateWithId extends Developers {
  id: number;
}
