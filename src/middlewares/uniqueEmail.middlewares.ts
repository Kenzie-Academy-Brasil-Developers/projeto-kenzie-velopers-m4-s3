import { NextFunction, Request, Response } from "express";
import { DevelopersResult } from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) return next();

  const query: DevelopersResult = await client.query(
    `SELECT * FROM "developers" WHERE "email" = $1`,
    [email]
  );

  if (query.rowCount) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};
