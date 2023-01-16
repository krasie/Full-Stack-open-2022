import { useDispatch } from 'react-redux'
import { createAt } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notifiactionReducer'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAt = (e) => {
    e.preventDefault()
    const content = e.target.contact.value
    e.target.contact.value = ''
    dispatch(createAt(content))
    dispatch(showNotification(`${content} added`))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAt}>
        <div><input name='contact'/></div>
        <button>create</button>
      </form>
    </div>
  )
  
}

export default AnecdoteForm