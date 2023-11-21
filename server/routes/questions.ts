import express from 'express'

const router = express.Router()

// GET /api/v1/questions
router.get('/', async (req, res) => {
  res.json({})
})


export default router
