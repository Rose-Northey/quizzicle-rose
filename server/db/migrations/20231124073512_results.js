
export async function up(knex) {
 await knex.schema.createTable('results', (table) => {
  table.integer('score')
  table.integer('question_count')
 })}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('questions')
}
