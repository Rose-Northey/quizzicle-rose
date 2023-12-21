import db from './connection.ts'
import { QuestionData } from '../../models/question'
import { Quiz, QuizData, Answers } from '../../models/quiz.ts'

export async function getQuizzes(): Promise<Quiz[]> {
  return await db('quizzes').select(
    'quiz_id as quizId',
    'quiz_name as quizName'
  )
}

export async function getSingleQuizQuestions(id: number): Promise<QuestionData[]> {
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
  return db('questions')
    .where('quiz_id', quizId)
    .select('question_id as questionId', 'correct_answer as correctAnswer')
}
