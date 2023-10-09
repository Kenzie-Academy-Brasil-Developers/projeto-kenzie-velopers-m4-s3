import format from "pg-format";
import { client } from "../database";
import {
  Project,
  ProjectResult,
  ProjectUpdate,
  projectCreateWithId,
} from "../interfaces/projects.interface";
import { ProjectDetails } from "../interfaces/projects.interface";

export const createProjectService = async (
  data: projectCreateWithId
): Promise<Project> => {
  // funçãozinha para que quando criar o usuário e apagar seu id não
  // continue incrementando/somando.
  const maxIdQuery = "SELECT MAX(id) FROM projects";
  const maxIdResult = await client.query(maxIdQuery);
  const maxId = maxIdResult.rows[0].max || 0;
  data.id = maxId + 1;

  const queryFormat: string = format(
    `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: ProjectResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const getProjectByIdService = async (
  projectId: string
): Promise<ProjectDetails | null> => {
  const query = `
        SELECT
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM
            "projects" AS "p"
        LEFT JOIN
            "developers" AS "d" ON "p"."developerId" = "d"."id"
        WHERE
            "p"."id" = $1;
    `;

  const result = await client.query(query, [projectId]);

  return result.rows[0] as ProjectDetails;
};

export const updateProjectService = async (
  projectId: string,
  data: ProjectUpdate
): Promise<Project> => {
  const queryFormat: string = format(
    `UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: ProjectResult = await client.query(queryFormat, [
    projectId,
  ]);

  return queryResult.rows[0];
};
