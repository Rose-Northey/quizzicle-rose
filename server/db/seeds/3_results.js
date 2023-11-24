export async function seed(knex) {
  await knex('results').insert([
    {
      score: 0,
      question_count:0

    }])
  }