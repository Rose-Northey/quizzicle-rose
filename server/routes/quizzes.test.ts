import {
  expect,
  it,
  test,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import { getSingleQuizQuestions } from './quizzes'
import db from './connection'
import { QuestionData, QuestionSnakeCase } from '../../models/question'

beforeAll(() => {
  return db.migrate.latest()
})
beforeEach(() => {
  return db.seed.run()
})

test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

describe('get of a quiz and all of its questions, questions pushed into an answers array', () => {
  it('', async () => {
    
  })
})

afterAll(() => {
  return db.destroy()
})
