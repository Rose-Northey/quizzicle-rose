import request from 'superagent'

import { Question } from '../models/question'
import { Quiz, QuizData } from '../models/quiz'

const rootUrl = '/api/v1'

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
  } catch (error){
    // return 'an error occured'
      throw new Error(
        `An error occurred while adding the quiz`
      )
  }
}


function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}

export async function getSingleQuiz(id: string): Promise<Question[]> {

  const res = await request.get(rootUrl + '/quizzes/' + id)
  return res.body
}

export async function getQuizzes(): Promise<Quiz[]> {

  return [
    {
      quizId: 1,
      quizName: 'My First Quiz',
      lastUpdated: new Date(),
      isPublic: true,
    },
    {
      quizId: 2,
      quizName: 'My Second Quiz',
      lastUpdated: new Date(),
      isPublic: false,
      authorId: '1',
    },
    {
      quizId: 3,
      quizName: 'My Fancy Quiz',
      lastUpdated: new Date(),
      isPublic: true,
      authorId: '2',
    },
  ]
}
interface addQuestionParams {
  quiz_id:undefined|string
  text:Question
}
//adding question
export async function addQuestion({quiz_id,text}:addQuestionParams){
  const response = await request.post(`${rootUrl}/questions/${quiz_id}/add-question`).send(text)
  return response
}

//get specific id for quiz
export async function getQuizName(quizId:string|undefined){
  const response = await request.get(`${rootUrl}/quizzes/${quizId}`)

  return response.body.quiz_name
}
