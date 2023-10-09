import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";

export const validOSMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { preferredOS } = req.body;
  const validOS = ["Windows", "Linux", "MacOS"];

  if (!validOS.includes(preferredOS)) {
    return next(new AppError("Invalid OS option.", 400));
  }

  next();
};
