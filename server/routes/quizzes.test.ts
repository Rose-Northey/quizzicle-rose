import { describe, expect, it, test, vi } from 'vitest'
import server from '../server.ts'
import * as db from '../db/db.ts'
import request from 'supertest'
import { QuestionData } from '../../models/question.ts'
import QuestionCreate from '../../client/components/QuestionCreate.tsx'


test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

vi.mock('../db/db')
describe('POST /api/vi/:quizId/add-question',()=>{
  it('it returns status code 200 if question is successfully added', async ()=>{
    //Arrange
   
    const mockNewQuestion={
      question_text:"test question",
      correct_answer: "test correct answer",
      incorrect_answer1: "test incorrect answer1",
      incorrect_answer2: "test incorrect answer2",
      incorrect_answer3: "test incorrect answer3"
    }

 
  vi.mocked(db.insertQuestion).mockResolvedValue(mockNewQuestion as unknown as any[])

  const response = await request(server).post('/api/v1/questions/1/add-question').send(mockNewQuestion)
  expect(response.status).toBe(200)
  expect(response.body.question_text).toBe("test question")
})
})