import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = forwardRef((props,ref) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0'
  }

  const buttonShow  = !show ? 'show' : 'hide'
  const blogUser = props.blog?.user

  let deleteBottonShow = false

  if(props.loginUser && blogUser){
    deleteBottonShow = blogUser?.id === props.loginUser
  }

  const visible = {
    display: show ? '' : 'none',
  }
  const delelteBottonnVisible = {
    display: deleteBottonShow? '' : 'none',
  }

  const toggleBlogVisible = () => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleBlogVisible
    }
  })

  return(
    <div style={ blogStyle } className='blog'>
      <div>{props.blog.title} <button onClick={toggleBlogVisible} value={props.blog.id}>{buttonShow}</button></div>
      <div style={visible}>
        <div style={visible}>{props.blog.url}</div>
        <div style={visible}><span className='like-num'>{props.blog.likes}</span><button className='like' onClick={props.handleLike} value={props.blog.id}>like</button></div>
        <div>{props.blog.author}</div>
        <div><button onClick={props.handleDeleteBlog} value={props.blog.id} style={delelteBottonnVisible} className='del'>delete</button></div>
      </div>
    </div>
  )})

Blog.displayName = 'Blog'

export default Blog