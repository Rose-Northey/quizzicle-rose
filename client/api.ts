import request from 'superagent'
import { Quiz } from '../models/quiz.ts'

const rootUrl = '/api/v1/'

export async function getQuizzes() {
  const response = await request.get(rootUrl + '/quizzes')

  return response.body as Quiz[]
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}
logError
