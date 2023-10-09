import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/App.error";

export const validateDeveloperById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  const developerQuery = 'SELECT * FROM "developers" WHERE "id" = $1';
  const developerResult = await client.query(developerQuery, [developerId]);

  if (developerResult.rowCount === 0) {
    return next(new AppError("Developer not found.", 404));
  }

  next();
};
