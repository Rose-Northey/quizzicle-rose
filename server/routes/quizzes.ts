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
    const quizDBData =  await db.getSingleQuizQuestions(id)
      const quizData = quizDBData.map(element => {
        const revisedQuestion = {...element, answers: []}
          Object.keys(element).forEach(key => {
            if (key.match('Answer')){
              revisedQuestion.answers.push(element[key])
              delete revisedQuestion[key]
            }
        })
       return revisedQuestion
    })
    res.json(quizData)
  } catch (error){
    console.log(error)
    res.status(500).json({ message: 'Rats! Somthing went wrong!' })
  }
})

export default router
