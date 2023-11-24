import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import QuizList from './components/QuizList.tsx'

import QuizCreate from './components/QuizCreate.tsx'
import Quiz from './components/Quiz.tsx'
import QuestionCreate from './components/QuestionCreate'
import QuizResult from './components/QuizResult'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<QuizList />} />
    <Route path="/create" element={<QuizCreate />} />
    <Route path="/:quizId" element={<Quiz />} />
    <Route path="/:quizId/add-question" element={<QuestionCreate />} />
    <Route path="/:quizId/my-result" element={<QuizResult />} />
  </Route>
)
