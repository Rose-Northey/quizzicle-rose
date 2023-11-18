import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import QuizList from './components/QuizList.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<QuizList />} />
  </Route>
)
