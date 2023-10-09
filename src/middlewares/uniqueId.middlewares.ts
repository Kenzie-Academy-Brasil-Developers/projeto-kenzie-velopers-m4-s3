import { NextFunction, Request, Response } from "express";
import { DevelopersResult } from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const checkDeveloperExists = async (
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

export const validateDeveloperIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  const result = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1',
    [developerId]
  );

  if (result.rowCount === 0) {
    return next(new AppError("Developer not found.", 404));
  }

  next();
};

export const validateProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const projectQuery = 'SELECT * FROM "projects" WHERE "id" = $1';
  const projectResult = await client.query(projectQuery, [id]);

  if (projectResult.rowCount === 0) {
    return next(new AppError("Project not found.", 404));
  }

  next();
};
