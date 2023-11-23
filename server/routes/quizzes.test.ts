import { describe, expect, it, test, vi } from 'vitest'
import server from '../server.ts'
import request from 'supertest'
import * as db from '../db/quizzes'

vi.mock('../db/quizzes')

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
