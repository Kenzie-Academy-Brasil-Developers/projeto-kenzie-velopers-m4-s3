import { Router } from "express";
import { developerRouter } from "./developer.router";
import { projectsRouter } from "./projects.router";

export const routes: Router = Router();

routes.use('/developers', developerRouter);
routes.use('/projects', projectsRouter);