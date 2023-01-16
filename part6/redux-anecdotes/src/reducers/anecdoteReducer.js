import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'


const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = anecdotesAtStart

const anecdoteSlice = createSlice({
  name: 'anecdote',
    initialState,
    reducers: {
      appendAnecdote(state, action){
        const data = action.payload
        state.push({
          content: data.content,
          id: data.id,
          votes: data.votes
        })
      },
      updateAnecdote(state, action){
        const changedAnecdotes = action.payload
        return state.map(anecdote => anecdote.id !==  changedAnecdotes.id ? anecdote : changedAnecdotes).sort((a, b) => b.votes - a.votes)
      },
      setAnecdote(state, action){
        return action.payload
      }
    }
})

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const handleVote = anecdote =>{
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdotesService.update(changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { setAnecdote,appendAnecdote,updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer