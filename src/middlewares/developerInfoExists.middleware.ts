import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/App.error";
import { DevelopersResult } from "../interfaces/developers.interface";

export const developerInfoExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.params;
  const query: DevelopersResult = await client.query(
    `SELECT * FROM "developerInfos" WHERE "developerId" = $1`,
    [developerId]
  );

  if (query.rowCount > 0) {
    return next(new AppError("Developer infos already exists.", 409));
  }

  next();
};
