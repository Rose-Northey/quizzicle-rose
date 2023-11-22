import db from './connection.ts'
import { Quiz } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return await db('quizzes').select(
    'quiz_id as quizId',
    'quiz_name as quizName'
  )
}
