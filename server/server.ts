import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import quizRoutes from './routes/quizzes'
import questionRoutes from './routes/questions'
import resultsRoutes from './routes/results'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(Path.join(__dirname, 'public')))

server.use('/api/v1/quizzes', quizRoutes)
server.use('/api/v1/questions', questionRoutes)
server.use('/api/v1/results', resultsRoutes)

server.get('*', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/index.html'))
})

export default server
