import db from './connection.ts'
import { QuestionSnakeCase } from '../../models/question'
import { Quiz, QuizData, Answers, Results } from '../../models/quiz.ts'

export async function getResults(): Promise<Quiz[]> {
  return await db('results').select('*').first()
}


export async function addNewResults(results: Results){
  return await db('results')
    .update({
      score: results.score,
      question_count: results.question_count
    })
}

export async function getCorrectAnswersByQuizId(
  quizId: number
): Promise<Answers[]> {
  // console.log(quizId)
  return db('questions')
    .where('quiz_id', quizId)
    .select('correct_answer as correctAnswer')
}
