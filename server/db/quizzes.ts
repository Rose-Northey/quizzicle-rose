import db from './connection.ts'
import { Quiz, QuizSnakeCase, QuizData } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  console.log('whatever')
  return await db('quizzes').select(
    'quiz_id as quizId',
    'quiz_name as quizName'
  )
}
//'quiz_id as quizId', 'quiz_name as quizName'
