import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notifiactionReducer from './reducers/notifiactionReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer,
    notification:notifiactionReducer,
    filter:filterReducer
  }
})

export default store