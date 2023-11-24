import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'
import { insertQuestion } from '../db/questionsDb'

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

router.post('/:quizId/add-question', async (req, res) => {
  try {
    const newQuestion = req.body
    const id = Number(req.params.quizId)
    const response = await insertQuestion(id, newQuestion)
    res.status(200).send(response)
  } catch (e) {
    res.status(500).send('Could not add Question')
  }
})

export default router
