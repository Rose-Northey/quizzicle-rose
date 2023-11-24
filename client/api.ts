import request from 'superagent'
import { Question, SelectedAnswer } from '../models/question'
import { Quiz, QuizData } from '../models/quiz'

const rootUrl = '/api/v1'

/////////////////////////////////////////////////////
// Quizzes Apiz

export async function getQuizzes() {
  try {
    const response = await request.get(rootUrl + '/quizzes')
    return response.body as Quiz[]
  } catch (err) {
    logError(err as Error)
  }
}

export async function AddQuiz({
  quizName,
  isPublic,
}: {
  quizName: string
  isPublic: boolean
}) {
  try {
    const httpRequestObject = await request
      .post(`${rootUrl}/quizzes`)
      .send({ quizName, isPublic })
    const newQuizId = httpRequestObject.body
    return newQuizId
  } catch (error) {
    // return 'an error occured'
    throw new Error(`An error occurred while adding the quiz`)
  }
}

/////////////////////////////////////////////////////
// QustionsApiz

export async function getSingleQuiz(quizId: string): Promise<Question[]> {
  const res = await request.get(rootUrl + '/quizzes/' + quizId)
  return res.body
}

interface addQuestionParams {
  quiz_id: undefined | string
  text: Question
}
//adding question
export async function addQuestion({ quiz_id, text }: addQuestionParams) {
  const response = await request
    .post(`${rootUrl}/questions/${quiz_id}/add-question`)
    .send(text)
  return response
}

//get specific id for quiz
export async function getQuizName(quizId: string | undefined) {
  const response = await request.get(`${rootUrl}/quizzes/name/${quizId}`)

  return response.body.quiz_name
}

/////////////////////////////////////////////////////
// Results Apis

export async function calculateResults({
  quizId,
  selectedAnswers,
}: {
  quizId: string
  selectedAnswers: SelectedAnswer[]
}) {
  const res = await request
    .post(`${rootUrl}/results/${quizId}`)
    .send(selectedAnswers)
  const results = res.body
  return results
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}
