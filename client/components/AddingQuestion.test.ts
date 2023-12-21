// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { screen } from '@testing-library/react/pure'
import { renderApp } from '../tests/setup.js'
import '../tests/setup.js'

describe('the add question form', () => {
  it('has an input for questions', async () => {
    renderApp('/1/add-question')
    nock('http://localhost')
      .get('/api/v1/quizzes/name/1')
      .reply(200, { quiz_name: 'Lol' })
    const label = await screen.findByLabelText('Question')
    expect(label).toBeVisible()
  })
  it('can be filled in and submitted', async () => {
    const scope = nock('http://localhost')
      .post('/api/v1/questions/1/add-question')
      .reply(200, [])
    nock('http://localhost')
      .get('/api/v1/quizzes/name/1')
      .reply(200, { quiz_name: 'Lol' })
    const { user } = renderApp('/1/add-question')
    const questionInput = await screen.findByLabelText('Question')
    const correctAnswerInput = screen.getByLabelText('Correct answer')
    const incorrectAnswerInput1 =
      screen.getAllByLabelText('Incorrect Answer')[0]
    const incorrectAnswerInput2 =
      screen.getAllByLabelText('Incorrect Answer')[1]
    const incorrectAnswerInput3 =
      screen.getAllByLabelText('Incorrect Answer')[2]

    await user.type(questionInput, 'What is the capital of France?')
    await user.type(correctAnswerInput, 'Paris')
    await user.type(incorrectAnswerInput1, 'California')
    await user.type(incorrectAnswerInput2, 'Denmark')
    await user.type(incorrectAnswerInput3, 'Seattle')

    const button = screen.getByText('Add and make another')
    await user.click(button)

    expect(scope.isDone()).toBe(true)
    expect(questionInput.textContent).toBe('')
  })
})
