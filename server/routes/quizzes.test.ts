import { describe, it, expect, vi } from 'vitest'
import server from '../server.ts'
import { Quiz } from '../../models/quiz.ts'

import * as db from '../db/quizzes.ts'
import request from 'supertest'

vi.mock('../db/quizzes.ts')

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
