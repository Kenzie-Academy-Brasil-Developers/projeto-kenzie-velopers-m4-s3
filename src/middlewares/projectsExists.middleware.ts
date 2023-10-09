import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/App.error";

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
