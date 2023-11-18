export async function seed(knex) {
  await knex('questions').del()
  await knex('quizzes').del()
}
