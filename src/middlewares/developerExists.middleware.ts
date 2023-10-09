import { NextFunction, Request, Response } from "express";
import { DevelopersResult } from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const developerExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.params;
  const query: DevelopersResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1`,
    [developerId]
  );

  if (query.rowCount === 0) {
    return next(new AppError("Developer not found.", 404));
  }

  next();
};
