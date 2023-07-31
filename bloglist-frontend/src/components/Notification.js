import React from 'react'

export default function Notification({ message, type }) {
  if (message === null) {
    return null
  }

  const styleError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const styleSuccess = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="error" style={type === 'error' ? styleError : styleSuccess}>
      {message}
    </div>
  )
}
