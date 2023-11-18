/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('quizzes', (table) => {
    table.increments('quiz_id').primary()
    table.varchar('quiz_name')
    table.dateTime('last_updated')
    table.boolean('is_public')
    table.varchar('author_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('quizzes')
}
