import React from 'react'
import Button from '@mui/material/Button'
import { SocketContext } from '../SocketContent'
import { useContext, useEffect } from 'react'
const Notification = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
  return (
    <div>
        {call.isReceivedCall && !callAccepted &&(
            <div style={{display:'flex', justifyContent:'center'}}>
                <h1>{call.name} is calling you</h1>
                <Button variant='contained' color="primary" onClick={answerCall}>Answer</Button>

            </div>
        ) }
    </div>
  )
}

export default Notification