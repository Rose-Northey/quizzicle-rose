// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { screen } from '@testing-library/react/pure'
import { renderApp } from '../tests/setup.js'
import '../tests/setup.js'

describe('the quiz list view', () => {
  it('shows a list of quiz names that are links', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/quizzes')
      .reply(200, [{ quizId: 8, quizName: 'What is love?' }])
    renderApp('/')

    const quizLink = await screen.findByRole('link', { name: 'What is love?' })
    expect(quizLink).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
  it('shows an error state if server request fails', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/quizzes')
      .reply(500, new Error('booooo'))
    renderApp('/')

    const errorMsg = await screen.findByText('Broekd!')
    expect(errorMsg).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
