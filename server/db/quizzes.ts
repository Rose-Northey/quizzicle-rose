import db from './connection.ts'
import { Quiz, QuizData } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}



export async function addNewQuiz(quizData: QuizData):Promise<Quiz>{
  return await db('quizzes').insert(
    {"quiz_name": quizData.quizName,
    "last_updated": quizData.lastUpdated,
    "is_public": quizData.isPublic})
    .returning('quiz_id')
}