import express from 'express'
import { insertQuestion } from '../db/db'
const router = express.Router()

// GET /api/v1/questions
router.get('/', async (req, res) => {
  res.json({})
})
router.post('/:quizId/add-question', async (req,res)=>{
  try{
    const newQuestion = req.body
    const quizId = Number(req.params.quizId)
    const response = await insertQuestion(quizId,newQuestion)
    res.status(200).send(response)
  }catch(e){
    res.status(500).send('Could not add Question')
  }
  
 
})
export default router
