import {
  expect,
  it,
  test,
  describe,
  expectTypeOf,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import { addNewQuiz } from './quizzes'
import connection from './connection'

beforeAll(() => {
  return connection.migrate.latest()
})
beforeEach(() => {
  return connection.seed.run()
})

describe('addNewQuiz', () => {
  const quizData = {
    quizName: 'My First Quiz',
    lastUpdated: new Date(),
    isPublic: false,
  }

  it('adds a new row to the quizzes database', async () => {
    const newQuizId = await addNewQuiz(quizData)
    expect(newQuizId).toEqual([{ quiz_id: 4 }])
  })
})

afterAll(() => {
  return connection.destroy()
})
