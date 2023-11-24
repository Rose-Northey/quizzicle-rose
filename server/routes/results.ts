import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'
import { getResults, addNewResults } from '../db/results'
import { insertQuestion } from '../db/questionsDb'

const router = express.Router()

// http://localhost:5173/api/v1/results/:quizId

router.get('/', async (req,res)=>{
  const results = await getResults() 
  res.json(results)
})

router.post('/:quizId', async (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const selectedAnswers = req.body
  const correctAnswers = await getCorrectAnswersByQuizId(quizId)
  const result = {
    score: correctAnswers.reduce((currentScore, currentAnswer) => {
      if (
        currentAnswer.correctAnswer ===
        selectedAnswers[currentAnswer.questionId.toString()]
      ) {
        return currentScore + 1
      }
      return currentScore
    }, 0),
    questionCount: correctAnswers.length,
  }
  res.json(result)
})

export default router