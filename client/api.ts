import request from 'superagent'
import { Quiz, QuizData } from '../models/quiz.ts'

const rootUrl = '/api/v1'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getQuizzes(): Promise<Quiz[]> {
  await sleep(1500)

  return [
    {
      quizId: 1,
      quizName: 'My First Quiz',
      lastUpdated: new Date(),
      isPublic: true,
    },
    {
      quizId: 2,
      quizName: 'My Second Quiz',
      lastUpdated: new Date(),
      isPublic: false,
      authorId: '1',
    },
    {
      quizId: 3,
      quizName: 'My Fancy Quiz',
      lastUpdated: new Date(),
      isPublic: true,
      authorId: '2',
    },
  ]
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}

// const getScore = async () => {
//   const data = await server.get('')
//   return data
// }

export async function getAnswers() {
  const response = await request.get('/api/v1/results')

  return response.body as Answers[]
}