import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifiactionReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if( state.filter === '' ){
      return state.anecdotes
    }
    return state.anecdotes.filter( a => a.content.includes(state.filter) )
  })
  const dispatch = useDispatch()

  const voteClick = (anecdote) => {
    dispatch(handleVote(anecdote))
    dispatch(setNotification(`${anecdote.content} was voted successfully`))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList