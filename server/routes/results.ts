import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'

const router = express.Router()

// POST to /api/v1/results/:quizId
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
