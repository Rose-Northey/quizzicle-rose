/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('questions', (table) => {
    table.increments('question_id').primary()
    table.integer('quiz_id').references('quizzes.quiz_id')
    table.text('question_text')
    table.varchar('correct_answer')
    table.varchar('incorrect_answer1')
    table.varchar('incorrect_answer2')
    table.varchar('incorrect_answer3')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('questions')
}
