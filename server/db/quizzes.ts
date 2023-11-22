import db from './connection'
import { Quiz, QuizSnakeCase, QuizData } from '../../models/quiz'
import { QuestionData, QuestionSnakeCase } from '../../models/question'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}

export async function getSingleQuizQuestions(
  id: number
): Promise<QuestionSnakeCase[]> {
  return await db('questions')
    .join('quizzes', 'quizzes.quiz_id', 'questions.quiz_id')
    .where('questions.quiz_id', id)
    .select(
      'quizzes.quiz_name as quizName',
      'questions.quiz_id as quizId',
      'questions.question_id as questionId',
      'questions.question_text as questionText',
      'questions.correct_answer as correctAnswer',
      'questions.incorrect_answer1 as incorrectAnswer1',
      'questions.incorrect_answer2 as incorrectAnswer2',
      'questions.incorrect_answer3 as incorrectAnswer3'
    )
}
