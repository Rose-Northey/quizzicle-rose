import express from 'express'
import { insertQuestion } from '../db/questionsDb'

const router = express.Router()

// GET /api/v1/questions
router.get('/', async (req, res) => {
  res.json({})
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
