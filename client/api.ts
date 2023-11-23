import request from 'superagent'
import { Quiz, QuizData } from '../models/quiz.ts'

const rootUrl = '/api/v1'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getQuizzes(): Promise<Quiz[]> {
  await sleep(1500)

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

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
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

// {1: 'incorrect answer3', 2: 'incorrect answer1', 3: 'correct answer'}

// //[
// 	{
// 		"questionId": 1,
// 		"correctAnswer": "correct answer"
// 	},
// 	{
// 		"questionId": 2,
// 		"correctAnswer": "correct answer"
// 	},
// 	{
// 		"questionId": 3,
// 		"correctAnswer": "correct answer"
// 	}
// ]

//get the data into an array of only the correct andswer and only the user selected answer

//use a map function and use the index to compare each item in the array

//if they are the same, increase a score by 1
