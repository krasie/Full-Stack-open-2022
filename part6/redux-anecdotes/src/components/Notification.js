import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)



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