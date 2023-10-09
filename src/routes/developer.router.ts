import { Router } from "express";
import { createDeveloperController, createDeveloperInfoController, deleteDeveloperController, readDeveloperByIdController, updateDeveloperController } from "../controllers/developer.controller";
import { uniqueEmail } from "../middlewares/uniqueEmail.middlewares";
import { checkDeveloperExists } from "../middlewares/uniqueId.middlewares";
import { developerInfoExistsMiddleware } from "../middlewares/developerInfoExists.middleware";
import { developerExistsMiddleware } from "../middlewares/developerExists.middleware";
import { validOSMiddleware } from "../middlewares/validOS.middleware";

export const developerRouter: Router = Router()

developerRouter.post('/', uniqueEmail, createDeveloperController)

developerRouter.get('/:developerId', checkDeveloperExists, readDeveloperByIdController)

developerRouter.patch('/:developerId', checkDeveloperExists, uniqueEmail, updateDeveloperController)

developerRouter.delete('/:developerId', checkDeveloperExists, deleteDeveloperController)

developerRouter.post('/:developerId/infos', developerExistsMiddleware, developerInfoExistsMiddleware, validOSMiddleware, createDeveloperInfoController);