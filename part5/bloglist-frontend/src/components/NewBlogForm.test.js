import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('New Blog Form',async() => {
  const handleSubmit = jest.fn(x => x)
  const user = userEvent.setup()

  render(<NewBlogForm handleSubmit={handleSubmit}/>)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Create Blog')

  await user.type(title, 'this is titile')
  await user.type(author, 'this is author' )
  await user.type(url, 'this is url' )

  await user.click(sendButton)

  expect(handleSubmit.mock.calls).toHaveLength(1)

})
