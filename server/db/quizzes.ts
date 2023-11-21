import db from './connection'
import { Quiz, QuizSnakeCase, QuizData } from '../../models/quiz'
import { QuestionData, QuestionSnakeCase } from '../../models/question'

export async function getQuizzes(): Promise<Quiz[]> {
  return [] as Quiz[]
}

export async function getSingleQuizQuestions(id: number): Promise<QuestionSnakeCase[]>{
  return await db('questions')
    .join('quizzes', 'quizzes.quiz_id', 'questions.quiz_id' )
    .where('questions.quiz_id', id)
    .select('quizzes.quiz_name', 'questions.quiz_id', 'questions.question_id', 'questions.question_text', 'questions.correct_answer', 'questions.incorrect_answer1', 'questions.incorrect_answer2', 'questions.incorrect_answer3')

}
