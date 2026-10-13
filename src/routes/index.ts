import { Router } from "express";

import { projectsRoutes } from "./projects-routes";

const routes = Router();
routes.use("/api/v1", projectsRoutes);

export { routes };
