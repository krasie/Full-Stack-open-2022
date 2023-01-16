import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationsSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        showNotification(state, action){
            const content = action.payload
            console.log(content)
            return content
        },
        hiddenNotification(state, action){
            return ''
        }
    }
})

export const { showNotification,hiddenNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
