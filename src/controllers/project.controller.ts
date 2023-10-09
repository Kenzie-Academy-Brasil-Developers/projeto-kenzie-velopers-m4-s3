import { Request, Response } from "express";
import {
  createProjectService,
  updateProjectService,
} from "../services/project.service";
import { Project } from "../interfaces/projects.interface";
import { getProjectByIdService } from "../services/project.service";

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Project = await createProjectService(req.body);

  return res.status(201).json(project);
};

export const getProjectByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const projectId = parseInt(id, 10);

  const project = await getProjectByIdService(projectId.toString());
  return res.status(200).json(project);
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const project: Project = await updateProjectService(id, req.body);

  return res.status(200).json(project);
};
