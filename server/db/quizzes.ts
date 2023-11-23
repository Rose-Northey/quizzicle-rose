import db from './connection.ts'
import { Quiz, QuizSnakeCase, QuizData, Answers } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}

export async function getCorrectAnswersByQuizId(
  quizId: number
): Promise<Answers[]> {
  // console.log(quizId)
  return db('questions')
    .where('quiz_id', quizId)
    .select('question_id as questionId', 'correct_answer as correctAnswer')
}
