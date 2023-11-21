import express from 'express'

import * as db from '../db/quizzes.ts'

const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  res.json({})
})

router.get('/:quiz_id', async (req, res) => {
  const id = Number(req.params.quiz_id)

  try {
    const quizData =  await db.getSingleQuizQuestions(id)

    quizData.map(v => ({...v, answers: []}))

    quizData[0].keys(a => {
      if (a.includes('answer')){
        quizData[0].answers.push(a)
      }
    })

    console.log(quizData)

    res.json({quizData})
  } catch (error){
    console.log(error)
    res.status(500).json({ message: 'Rats! Somthing went wrong!' })
  }
})

export default router
