import { expect, it, test, vi, describe } from 'vitest'
import request from 'supertest'
import server from '../server'
import { JSDOM } from 'jsdom'
import * as db from '../db/quizzes'

vi.mock('../db/quizzes')

test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

describe('post of a new quiz name and isPublic', ()=>{
  it('posts data and returns the 4th id number', async ()=>{
    const newQuizEntry = { 
      quizName: 'testingQuiz',
      lastUpdated: new Date(),
      isPublic: false
    }
    
    vi.mocked(db.addNewQuiz).mockImplementation(async()=>{
      return [{quiz_id: 4}];
    })

    const res = await request(server).post('/api/v1/quizzes')
    expect(res.statusCode).toBe(200)
  
  })


})
