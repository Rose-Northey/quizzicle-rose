import request from 'superagent'
import { Question } from '../models/question'
import { Quiz, QuizData } from '../models/quiz'

const rootUrl = '/api/v1'

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

export async function getSingleQuiz(id: string): Promise<Question[]> {
  const res = await request.get(rootUrl + '/quizzes/' + id)
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

export async function getAnswers(quizId: number) {
  const userAnswers = {
    1: 'incorrect answer3',
    2: 'incorrect answer1',
    3: 'correct answer',
  }
  const HTMLObject = await request.get(`${rootUrl}/questions/quiz/${quizId}`)
  const correctAnswers = HTMLObject.body

  const formattedCorrectAnswers = correctAnswers.map((object) => {
    return object.correctAnswer
  })

  let score = 0
  let questionCount = 0

  const formattedUserAnswers = Object.values(userAnswers)

  formattedCorrectAnswers.map((correctAnswer, index) => {
    questionCount++
    if (correctAnswer === formattedUserAnswers[index]) {
      score++
    }
  })
  const resultObj = { score, questionCount }
  // console.log(resultObj)
  return resultObj
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}
