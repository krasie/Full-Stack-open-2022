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
          votes: data.vote
        })
      },
      handleVote(state, action){
        const id = action.payload
        const anecdoteToChange =state.find(n => n.id === id)
        const changedAnecdotes ={
          ...anecdoteToChange,
          votes : anecdoteToChange.votes + 1
        }
        return state.map(note => note.id !==  id ? note : changedAnecdotes).sort((a, b) => b.votes - a.votes)
      },
      setAnecdote(state, action){
        console.log(action.payload)

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

export const { handleVote, setAnecdote,appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer