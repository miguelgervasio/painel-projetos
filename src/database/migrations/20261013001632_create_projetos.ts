import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("PROJETO", (table) => {
    table.increments("id").primary();
    table.string("codigoRM").notNullable().unique();
    table.integer("clienteId").notNullable();
    table.string("nome").notNullable();
    table.decimal("horasVendidas", 10, 2).notNullable();
    table.decimal("horasPlanejadas", 10, 2).notNullable();
    table.decimal("avancoFisico", 5, 2).notNullable().defaultTo(0);
    table.decimal("valorVendido", 12, 2).notNullable();
    table.date("dataInicio").notNullable();
    table.date("dataFimPrevista").notNullable();
    table.string("situacao").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("PROJETO");
}
