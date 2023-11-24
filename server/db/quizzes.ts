import db from './connection.ts'
import { Quiz, QuizData, Answers } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return await db('quizzes').select(
    'quiz_id as quizId',
    'quiz_name as quizName'
  )
}

export function getQuizNameById(quiz_id: number) {
  return db('quizzes').select('quiz_name').where('quiz_id', quiz_id).first()
}

export async function addNewQuiz(quizData: QuizData): Promise<Quiz> {
  return await db('quizzes')
    .insert({
      quiz_name: quizData.quizName,
      last_updated: quizData.lastUpdated,
      is_public: quizData.isPublic,
    })
    .returning('quiz_id')
}

export async function getCorrectAnswersByQuizId(
  quizId: number
): Promise<Answers[]> {
  // console.log(quizId)
  return db('questions')
    .where('quiz_id', quizId)
    .select('question_id as questionId', 'correct_answer as correctAnswer')
}
