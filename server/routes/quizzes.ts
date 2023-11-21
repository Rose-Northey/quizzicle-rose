import express from 'express'
import * as db from '../db/quizzes.ts'

const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await db.getQuizzes()
    console.log('List', quizzes)
    res.json(quizzes)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get Quizzes')
  }
})

export default router
