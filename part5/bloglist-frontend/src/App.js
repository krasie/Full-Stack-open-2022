import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      showMessage('login successful')
    }
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  const blogFormRef = useRef()


  const showMessage = (message,type='info') => {
    setMessage({ message:message,type:type })
    setTimeout(() => {
      setMessage({})
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      showMessage('login successful')

      setUsername('')
      setPassword('')

    }catch(e){
      showMessage('username or password is incorrect', 'error')
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleDeleteBlog = async (e) => {
    const blog = blogs.filter(blog => blog.id === e.target.value)[0]
    if(window.confirm(`delete blog '${blog.title}'`)){
      try{
        const resp = await blogService.deleteBlog(e.target.value)
        if(resp.status === 204){
          console.log('blog deleted')
          setBlogs(blogs.filter(blog => blog.id !== e.target.value))
          showMessage('delete blog successful')
        }
      }catch(e){
        showMessage('unauthorized', 'error')
      }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleNewBlog = async(e) => {
    e.preventDefault()
    const blogObj = {
      'title': blogFormRef.current.title,
      'url': blogFormRef.current.url,
      'author': blogFormRef.current.author
    }
    try{
      const response = await blogService.create(blogObj)
      setBlogs(blogs.concat(response))
      blogFormRef.current.setTitle('')
      blogFormRef.current.setAuthor('')
      blogFormRef.current.setUrl('')
      showMessage('blog created successfully')
    }catch(e){
      showMessage('create blog failed', 'error')
    }
  }

  const loginForm = () => {
    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)
    return (
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      />
    )
  }



  const newBlog = () => {

    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)} id='new-blog'>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            handleSubmit={handleNewBlog}
            ref={blogFormRef}
          />
          <button onClick={() => setNewBlogVisible(false)} >cancel</button>
        </div>
      </div>
    )
  }

  const handleLike = async(e) => {
    const updateBlog = blogs.find(blog => blog.id === e.target.value)
    updateBlog.likes += 1
    const res = await blogService.update(updateBlog)
    console.log(res)
    if(res.status === 200) {
      setBlogs(blogs.map(obj =>  obj.id === res.data.id? res.data : obj).sort((a, b) => b.likes - a.likes))

    }
  }

  return (
    <div>
      <Notification message={message.message} type={message.type} />
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={logout}>Logout</button>
          {newBlog()}
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDeleteBlog={handleDeleteBlog}
          loginUser={user?.id}
        />
      )}
    </div>
  )
}

export default App
