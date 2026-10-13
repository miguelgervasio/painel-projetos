import { Request, Response, NextFunction } from "express";
import { db } from "@/database/knex";
import { Project } from "@/database/types/project";
import { calcProjectHours } from "@/utils/calcSaldo";

class ProjectController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, clienteId, page, pageSize } = req.query;

      // Valores padrão simples para não dar erro de NaN
      const pageNum = Number(page) || 1; // Converte 'page' para número. Se não for informado ou for inválido, assume a página 1 como padrão

      const limitNum = Number(pageSize) || 10; // Converte 'pageSize' para número. Se não for informado ou for inválido, traz 10 itens por página como padrão

      const offsetNum = (pageNum - 1) * limitNum; // Calcula a quantidade de registros que o banco deve 'pular' (offset) com base na página atual e no limite, ex.: 2 - 1 = 1 * 10 = 10, então pula os 10 primeiros registros e traz os próximos 10 (ou conforme informado em pageSize)

      // Teste de erro para o middleware, descomentar para testar
      //   throw new Error("Mensagem de erro de teste");

      const query = db<Project>("PROJETO");

      if (clienteId) {
        query.where("clienteId", Number(clienteId));
      }

      if (status) {
        query.whereLike("situacao", `%${status}%`);
      }

      const projects = await query.select().offset(offsetNum).limit(limitNum);

      // Adicionado o cálculo de saldoHoras e horasRealizadas para o projeto manualmente, já que não existe a tabela de apontamento para os testes
      const projectsWithSaldo = projects.map(calcProjectHours);

      return res.json(projectsWithSaldo);
    } catch (err: any) {
      // Retorna diretamente a mensagem formatada para qualquer erro na rota
      return res.status(400).json({
        erro: "Parâmetros de consulta inválidos",
        mensagem: err.message,
      });
    }
  }
}

export { ProjectController };
