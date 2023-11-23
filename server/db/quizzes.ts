import db from './connection.ts'
import { Quiz } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}
export function getQuizNameById(quiz_id:number){
  return db('quizzes').select("quiz_name").where("quiz_id",quiz_id).first()
}