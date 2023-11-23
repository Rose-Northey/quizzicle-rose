import request from 'superagent'
import { Quiz } from '../models/quiz.ts'

const rootUrl = '/api/v1/'

export async function getQuizzes() {
  try {
    const response = await request.get(rootUrl + 'quizzes')
    return response.body as Quiz[]
  } catch (err) {
    logError(err as Error)
  }
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}

export async function AddQuiz({
  quizName,
  isPublic,
}: {
  quizName: string
  isPublic: boolean
}) {
  const httpRequestObject = await request
    .post(`${rootUrl}/quizzes`)
    .send({ quizName, isPublic })

  const newQuizId = httpRequestObject.body
  return newQuizId
}
