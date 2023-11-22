import { expect, it, test, describe, expectTypeOf, beforeAll, beforeEach } from 'vitest'
import {addNewQuiz} from './quizzes'
import connection from './connection'

beforeAll(() => {
  return connection.migrate.latest()
})
beforeEach(() => {
  return connection.seed.run()
})


test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

describe( 'addNewQuiz', ()=> {
  const quizData = {
    quizName: 'My First Quiz',
    lastUpdated: new Date(),
    isPublic: false
  }

  it('adds a new quiz to the quizzes database', async()=>{
    const newQuizId = await addNewQuiz(quizData)
    expectTypeOf(newQuizId).toEqualTypeOf(1)
  })
})