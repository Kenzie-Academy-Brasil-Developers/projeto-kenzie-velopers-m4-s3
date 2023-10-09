import format from "pg-format";
import {
  Developers,
  DevelopersCreate,
  DevelopersCreateWithId,
  DevelopersResult,
  DevelopersUpdate,
} from "../interfaces/developers.interface";
import { client } from "../database";

export const createDeveloperService = async (
  data: DevelopersCreateWithId
): Promise<Developers> => {
  // funçãozinha para que quando criar o usuário e apagar seu id não
  // continue incrementando/somando.
  const maxIdQuery = "SELECT MAX(id) FROM developers";
  const maxIdResult = await client.query(maxIdQuery);
  const maxId = maxIdResult.rows[0].max || 0;
  data.id = maxId + 1;

  const queryFormat: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DevelopersResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readDeveloperByIdService = async (
  developerId: string
): Promise<Developers> => {
  const query = `
    SELECT
       "d"."id" AS "developerId",
       "d"."name" AS "developerName",
       "d"."email" AS "developerEmail",
       "di"."developerSince" AS "developerInfoDeveloperSince",
       "di"."preferredOS" AS "developerInfoPreferredOS"
    FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di" 
    ON "di"."developerId" = "d"."id"
    WHERE "d"."id" = $1;`;

  const queryResult: DevelopersResult = await client.query(query, [
    developerId,
  ]);

  return queryResult.rows[0];
};

export const updateDeveloperService = async (
  developerId: string,
  data: DevelopersUpdate
): Promise<Developers> => {
  const queryFormat: string = format(
    `UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DevelopersResult = await client.query(queryFormat, [
    developerId,
  ]);

  return queryResult.rows[0];
};

export const deleteDeveloperService = async (
  developerId: string
): Promise<void> => {
  await client.query(`DELETE FROM "developers" WHERE "id" = $1`, [developerId]);
};

export const createDeveloperInfoService = async (
  developerId: string,
  developerSince: string,
  preferredOS: string
): Promise<any> => {
  // // Insira as informações adicionais do desenvolvedor // //
  const insertInfoQuery =
    'INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId") VALUES ($1, $2, $3) RETURNING *;';
  const insertInfoResult = await client.query(insertInfoQuery, [
    developerSince,
    preferredOS,
    developerId,
  ]);

  return insertInfoResult.rows[0];
};
