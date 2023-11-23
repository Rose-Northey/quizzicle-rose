import {
  expect,
  it,
  test, vi,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import { getSingleQuizQuestions } from './quizzes'
import connection from './connection'
import { QuestionData, QuestionSnakeCase } from '../../models/question'
import request from 'supertest'
import server from '../server'
// import { JSDOM } from 'jsdom'
import * as db from '../db/quizzes'

beforeAll(() => {
  return connection.migrate.latest()
})
beforeEach(() => {
  return connection.seed.run()
})


vi.mock('../db/quizzes')

test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

describe('get of a quiz and all of its questions, questions pushed into an answers array', () => {
  it('gets data and checks if an answers array', async () => {

    vi.mocked(db.getSingleQuizQuestions).mockImplementation(async()=>{
      return [
        {
          "quizName": "My First Quiz",
          "quizId": 1,
          "questionId": 1,
          "questionText": "Pretend this is a longer question?",
          "answers": [
            "correct answer",
            "incorrect answer1",
            "incorrect answer2",
            "incorrect answer3"
        ]}];
    })
    const res = await request(server).get('/api/v1/1')
    expect(res.statusCode).toBe(200)
    
  })
})

describe('post of a new quiz name and isPublic', ()=>{
  it('posts data and returns the 4th id number', async ()=>{    

    vi.mocked(db.addNewQuiz).mockImplementation(async()=>{
      return [{quiz_id: 4}];
    })

    const res = await request(server).post('/api/v1/quizzes')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(4)
  
  })
  it('throws an error if the database fails'), async()=>{
    vi.mocked(db.addNewQuiz).mockImplementation(async()=>{
      throw new Error('Database error');
    })
    
    const res = await request(server).post('/api/v1/quizzes')
    expect(res.statusCode).toBe(500);
    
  }
})


afterAll(() => {
  return connection.destroy()
})