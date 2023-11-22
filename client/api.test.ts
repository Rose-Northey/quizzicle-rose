import { expect, it, test, describe, vi } from 'vitest'
import supertest from 'supertest'
import {AddQuiz} from './api'

test('testing the testing', () => {
  it('returns positive is truth is truthy')
  expect(true).toBeTruthy()
})

describe('test clientside api posts 4th row', ()=>{

  it('retuns the number 4 after posting the 4th row', async()=>{
    const newQuizId = await AddQuiz({quizName: 'testQuiz', isPublic: true})
  })
} 
)