import { useSelector, useDispatch } from 'react-redux'
import { hiddenNotification } from '../reducers/notifiactionReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  setTimeout(() => {
    dispatch(hiddenNotification())
  }, 5000)

  const display = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notDisplay = {
    display: 'none'
  }

  const style = notification !== '' ? display : notDisplay

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification