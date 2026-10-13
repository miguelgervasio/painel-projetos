import { Project } from "@/database/types/project";

export function calcProjectHours(project: Project) {
  const horasRealizadas = 30;

  const saldoHoras = Number(project.horasVendidas) - horasRealizadas;

  return {
    ...project,
    horasRealizadas,
    saldoHoras,
  };
}
