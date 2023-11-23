// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import nock from 'nock'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import { renderApp } from '../tests/setup.js'
// import '../tests/setup.js'


describe('create new quiz form', () => {
  it('has an input to add quiz name', () => {
    renderApp('/create')
    const label = screen.getByLabelText('Quiz name')
    expect(label).toBeVisible()
  })
  it('user can enter quiz name and submit', async () => {
    const scope = nock('http://localhost')
    .post('/api/v1/quizzes')
    .reply(200, 3)
    const {user} = renderApp('/create')
    const quizNameInput = screen.getByLabelText('Quiz name')
    await user.type(quizNameInput, 'Capital Cities')

    const button = screen.getByText("Create and add questions")
    await user.click(button)

    expect(scope.isDone()).toBe(true)
  
  })
})

//nock out the api route
//setup the app at same route
//fill out the form, look for input by label text
// use user object to make action type against inputs