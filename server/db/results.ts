import db from './connection.ts'
import { Answers } from '../../models/quiz.ts'

export async function getCorrectAnswersByQuizId(
  quizId: number
): Promise<Answers[]> {
  return db('questions')
    .where('quiz_id', quizId)
    .select('correct_answer as correctAnswer')
}
