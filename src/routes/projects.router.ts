import { Router } from "express";
import { createProjectController, updateProjectController } from "../controllers/project.controller";
import { validateDeveloperIdMiddleware, validateProjectById } from "../middlewares/uniqueId.middlewares";
import { getProjectByIdController } from '../controllers/project.controller';
import { validateDeveloperById } from "../middlewares/validadeDeveloper.middleware";

export const projectsRouter: Router = Router()

projectsRouter.post('/', validateDeveloperIdMiddleware, createProjectController);
projectsRouter.get('/:id',  validateProjectById, getProjectByIdController);
projectsRouter.patch('/:id', validateDeveloperById, validateProjectById, updateProjectController);