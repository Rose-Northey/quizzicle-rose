import { expect, it, describe, beforeAll, beforeEach, afterAll } from 'vitest'
import { addNewQuiz, getQuizzes } from './quizzes'
import connection from './connection'

beforeAll(() => {
  return connection.migrate.latest()
})
beforeEach(() => {
  return connection.seed.run()
})

describe('getQuizzes', () => {
  const quizObjectArray = [
    {
      quizId: 1,
      quizName: 'My First Quiz',
    },
    {
      quizId: 2,
      quizName: 'My Second Quiz',
    },
    {
      quizId: 3,
      quizName: 'My Fancy Quiz',
    },
  ]
  it('displays list of quizzes', async () => {
    const quizList = await getQuizzes()
    expect(quizList).toEqual(quizObjectArray)
  })
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
