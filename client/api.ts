import request from 'superagent'
import { Quiz} from '../models/quiz.ts'
import { Question } from '../models/question.ts'

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