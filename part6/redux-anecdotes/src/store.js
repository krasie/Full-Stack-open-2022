import { configureStore } from '@reduxjs/toolkit'
import blogReducer,{ createAt, handleVote } from './reducers/anecdoteReducer'


const store = configureStore({reducer:{blogs:blogReducer}})

export default store