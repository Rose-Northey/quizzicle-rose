import { Quiz } from '../../models/quiz.ts'
import { describe, expect, it, vi } from 'vitest'
import server from '../server.ts'
import request from 'supertest'
import * as db from '../db/quizzes'

vi.mock('../db/quizzes')

describe('get of a quiz and all of its questions, questions pushed into an answers array', () => {
  it('gets data and checks if an answers array', async () => {
    vi.mocked(db.getSingleQuizQuestions).mockImplementation(async () => {
      return [
        {
          quizName: 'My First Quiz',
          quizId: 1,
          questionId: 1,
          questionText: 'Pretend this is a longer question?',
          answers: [
            'correct answer',
            'incorrect answer1',
            'incorrect answer2',
            'incorrect answer3',
          ],
        },
      ]
    })
    const res = await request(server).get('/api/v1/quizzes/1')
    expect(res.statusCode).toBe(200)
  })
})

describe('GET /api/v1/quizzes', () => {
  it('GETs all quizzes', async () => {
    // ARRANGE
    vi.mocked(db.getQuizzes).mockImplementation(async () => {
      return [
        {
          quizId: 8,
          quizName: 'What is love?',
        } as Quiz,
      ]
    })

    const res = await request(server).get('/api/v1/quizzes')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "quizId": 8,
          "quizName": "What is love?",
        },
      ]
    `)
  })

  it('returns a 500 and an error message when db fails', async () => {
    // ARRANGE
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.getQuizzes).mockImplementation(async () => {
      throw new Error()
    })
    const res = await request(server).get('/api/v1/quizzes')
    expect(res.statusCode).toBe(500)
    expect(res.text).toMatch(/Could not get Quizzes/)
  })
})

describe('post of a new quiz name and isPublic', () => {
  it('posts data and returns the 4th id number', async () => {
    vi.mocked(db.addNewQuiz).mockImplementation(async () => {
      return [{ quiz_id: 4 }]
    })

    const res = await request(server).post('/api/v1/quizzes')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(4)
  })
  it('throws an error if the database fails'),
    async () => {
      vi.mocked(db.addNewQuiz).mockImplementation(async () => {
        throw new Error('Database error')
      })

      const res = await request(server).post('/api/v1/quizzes')
      expect(res.statusCode).toBe(500)
    }
})
