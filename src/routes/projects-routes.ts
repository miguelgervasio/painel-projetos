import { Router } from "express";
import { ProjectController } from "@/controllers/projects-controller";

const projectsRoutes = Router();
const projectsController = new ProjectController();

projectsRoutes.get("/projetos", projectsController.index);

export { projectsRoutes };
