import express from 'express'
import { insertQuestion } from '../db/db'
const router = express.Router()

// GET /api/v1/questions
router.get('/', async (req, res) => {
  res.json({})
})
router.post('/:quizId/add-question', async (req,res)=>{
  const newQuestion = req.body
  const quizId = Number(req.params.quizId)
  console.log(newQuestion,quizId)
  const response = await insertQuestion(quizId,newQuestion)
  
  res.json(response)
 
})
export default router
