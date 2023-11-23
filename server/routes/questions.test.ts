import { describe, expect, it, test, vi } from 'vitest'
import server from '../server.ts'
import * as db from '../db/db.ts'
import request from 'supertest'



vi.mock('../db/db')
describe('Test if question is successfully added',()=>{
  it('it returns status code 200 if question is successfully added', async ()=>{
    //Arrange
   
    const mockNewQuestion={
      question_text:"test question",
      correct_answer: "test correct answer",
      incorrect_answer1: "test incorrect answer1",
      incorrect_answer2: "test incorrect answer2",
      incorrect_answer3: "test incorrect answer3"
    }
  vi.mocked(db.insertQuestion).mockResolvedValue(mockNewQuestion as unknown as unknown[])
    //Act
  const response = await request(server).post('/api/v1/questions/1/add-question').send(mockNewQuestion)
    //Assert
  expect(response.status).toBe(200)
  expect(response.body.question_text).toBe("test question")
})
})