export async function seed(knex) {
  await knex('quizzes').insert([
    {
      quiz_id: 1,
      quiz_name: 'My First Quiz',
      last_updated: new Date(),
      is_public: true,
      author_id: '1',
    },
    {
      quiz_id: 2,
      quiz_name: 'My Second Quiz',
      last_updated: new Date(),
      is_public: false,
      author_id: '1',
    },
    {
      quiz_id: 3,
      quiz_name: 'My Fancy Quiz',
      last_updated: new Date(),
      is_public: true,
      author_id: '2',
    },
  ])
}
