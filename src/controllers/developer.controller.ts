import { Request, Response } from "express";
import { Developers } from "../interfaces/developers.interface";
import {
  createDeveloperInfoService,
  createDeveloperService,
  deleteDeveloperService,
  readDeveloperByIdService,
  updateDeveloperService,
} from "../services/developer.service";

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developers = await createDeveloperService(req.body);

  return res.status(201).json(developer);
};

export const readDeveloperByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developers = await readDeveloperByIdService(
    req.params.developerId
  );

  return res.status(200).json(developer);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developers = await updateDeveloperService(
    req.params.developerId,
    req.body
  );

  return res.status(200).json(developer);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.developerId);

  return res.status(204).json();
};

export const createDeveloperInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { developerId } = req.params;
  const { developerSince, preferredOS } = req.body;

  const developerInfo = await createDeveloperInfoService(
    developerId,
    developerSince,
    preferredOS
  );

  return res.status(201).json(developerInfo);
};
