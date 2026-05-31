const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const succcessStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding:'10px',
    marginBottom: '10px'
    }
  
  const errorStyle = {...succcessStyle,
    color: 'red'
    }

  return error
  ? <div style={errorStyle}> {message} </div>
  : <div style={succcessStyle}> {message} </div>
}

export default Notification