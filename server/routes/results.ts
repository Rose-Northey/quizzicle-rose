import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'
import { getResults, addNewResults } from '../db/results'
import { insertQuestion } from '../db/questionsDb'

const router = express.Router()

// http://localhost:5173/api/v1/results/:quizId

// router.post('/', async (req,res)=>{

// })

router.post('/:quizId', async (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const selectedAnswers = req.body
  console.log(quizId)

  const answersObj = await getCorrectAnswersByQuizId(quizId)
  const correctAnswers = answersObj.map((obj)=>{
      return obj.correctAnswer
    })
    console.log(correctAnswers)

  const results ={
    score: 0,
    question_count:0
  }

    correctAnswers.map((correctAnswer, index) => {
      results.question_count++
      if (correctAnswer === selectedAnswers[index]) {
        results.score++
        console.log(results.score)
      }
    })

    console.log("yo")
    await addNewResults(results)
})

export default router