import { useState, forwardRef, useImperativeHandle } from 'react'

const NewBlogForm = forwardRef((props,ref) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useImperativeHandle(ref, () => {
    return {
      title,
      url,
      author,
      setTitle,
      setUrl,
      setAuthor
    }
  })

  return(
    <div>
      <h1>New Blog</h1>
      <form onSubmit={props.handleSubmit}>
        <div>
          <div>
            title:
            <input
              type="text"
              name="title"
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='title'
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              id='author'
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder='author'
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              id='url'
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder='url'
            />
          </div>
          <button type="submit" id='create-blog'>Create Blog</button>
        </div>
      </form>
    </div>
  )
})

NewBlogForm.displayName = 'NewBlogForm'

export default NewBlogForm