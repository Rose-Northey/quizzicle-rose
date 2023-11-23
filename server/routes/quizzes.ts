import express from 'express'
import { getQuizNameById } from '../db/db'
const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  res.json({})
})

export default router

router.get('/:id', async(req,res)=>{
  const quizId = req.params.id
  const response = await getQuizNameById(quizId)
  console.log("asdf",response)
  res.json(response)
})