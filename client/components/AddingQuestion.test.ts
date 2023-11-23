// @vitest-environment jsdom
import { describe, it, test, expect, vi } from 'vitest'
import nock from 'nock'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import { renderApp } from '../tests/setup.js'
import '../tests/setup.js'

// no import of apiClient
// no `vi.mock('...')`

describe('the add question form', () => {
  it('has an input for questions', () => {
    renderApp('/1/add-question')
    const label = screen.getByLabelText('Question')
    expect(label).toBeVisible()
  })
  it('can be filled in and submitted', async () => {
    const scope = nock('http://localhost')
    .post('/api/v1/questions/1/add-question')
    .reply(200, [])
    const {user} = renderApp('/1/add-question')
    const questionInput = screen.getByLabelText('Question')
    await user.type(questionInput, 'What is the capital of France?')
  })
})

//nock out the api route
//setup the app at same route
//fill out the form, look for input by label text
// use user object to make action type against inputs