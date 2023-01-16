import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifiactionReducer'


const AnecdoteForm = (props) => {

  const addAt = async (e) => {
    e.preventDefault()
    const content = e.target.contact.value
    e.target.contact.value = ''
    props.createAnecdote(content)
    props.setNotification(`${content} added`,10)
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

const mapStateToProps = (state) => {
  return {
    filter : state.filter
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const connectedAnecdoteForm = connect(mapStateToProps,mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm