import { connect } from 'react-redux'

const Notification = (props) => {

  const display = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notDisplay = {
    display: 'none'
  }

  const style = props.notification !== '' ? display : notDisplay

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification