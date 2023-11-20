import db from './connection.ts'
import { Quiz, QuizSnakeCase, QuizData } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}



export async function addNewQuiz(quizData: QuizData):Promise<Quiz>{
  await db('quizzes').insert(
    {"quiz_name": quizData.quizName,
    "last_updated": new Date(),
    "is_public": quizData.isPublic}
  )
}