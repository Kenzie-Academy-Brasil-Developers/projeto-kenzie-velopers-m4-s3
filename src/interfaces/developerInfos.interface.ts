import { QueryResult } from "pg";

export type PreferredOS = "Windows" | "Linux" | "MacOS";

export type DevelopersInfos = {
  id: number;
  developerSince: Date | null;
  preferredOS: string | null;
  developerId: string;
};

export type DevelopersInfosCreate = Omit<DevelopersInfos, "id">;
export type DevelopersInfosRead = DevelopersInfos[];
export type DevelopersInfosUpdate = Partial<DevelopersInfos>;
export type DevelopersInfosCreateById = QueryResult<DevelopersInfos>;
