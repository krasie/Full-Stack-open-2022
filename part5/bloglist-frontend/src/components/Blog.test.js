import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 7,
    __v: 0
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText(blog.title)
  expect(title).toHaveStyle('display: block')
  expect(title).toHaveDisplayValue
  const author = screen.getByText(blog.author)
  expect(author).toBeDefined()
  expect(author).toHaveStyle('display: block')
  const url = screen.getByText(blog.url)
  expect(url).toBeDefined()
  expect(url).toHaveStyle('display: none')
  const likes = screen.getByText(blog.likes)
  expect(likes).toBeDefined()
  expect(likes).toHaveStyle('display: none')
})


test('show likes and url when click ', async() => {
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 7,
    __v: 0
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const url = screen.getByText(blog.url)
  expect(url).toBeDefined()
  expect(url).toHaveStyle('display: block')
  const likes = screen.getByText(blog.likes)
  expect(likes).toBeDefined()
  expect(likes).toHaveStyle('display: block')

})