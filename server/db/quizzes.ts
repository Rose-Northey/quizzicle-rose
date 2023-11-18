import db from './connection.ts'
import { Quiz, QuizSnakeCase, QuizData } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}
