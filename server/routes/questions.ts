import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'

const router = express.Router()

// GET /api/v1/questions
router.get('/', async (req, res) => {
  res.json({})
})
// GET /api/v1/questions/quiz/:quizId
router.get('/quiz/:quizId', async (req, res) => {
  // console.log('do the thing')
  const quizId = parseInt(req.params.quizId)
  if (isNaN(quizId)) {
    res.status(400).send('Bad Request: Quiz ID must be a number')
    return
  }

  try {
    const answers = await getCorrectAnswersByQuizId(quizId)
    console.log(answers)

    if (!answers) {
      res.sendStatus(404)
      return
    }
    res.json(answers)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get answers')
  }
})

export default router
