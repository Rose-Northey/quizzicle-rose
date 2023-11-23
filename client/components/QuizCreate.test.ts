// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { screen} from '@testing-library/react/pure'
import { renderApp } from '../tests/setup.js'

describe('create new quiz form', () => {
  it('has an input to add quiz name', () => {
    renderApp('/create')
    const label = screen.getByLabelText('Quiz name')
    expect(label).toBeVisible()
  })
  it('user can enter quiz name and submit', async () => {
    const scope = nock('http://localhost').post('/api/v1/quizzes').reply(200)
    const { user } = renderApp('/create')
    const quizNameInput = screen.getByLabelText('Quiz name')
    await user.type(quizNameInput, 'Capital Cities')

    const button = screen.getByText('Create and add questions')
    await user.click(button)
    expect(scope.isDone()).toBe(true)
  })
  it('when api function fails to post, error handling happens', async()=>{
    nock('http://localhost')
    .post('/api/v1/quizzes')
    .reply(500)

    const { user } = renderApp('/create')
    const quizNameInput = screen.getByLabelText('Quiz name')
    await user.type(quizNameInput, 'Capital Cities')
    const button = screen.getByText('Create and add questions')
    await user.click(button)

    const error = await screen.findByText(/An error occurred while adding the quiz/)
    expect(error).toBeVisible()
  })
})
