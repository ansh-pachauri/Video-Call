import React from 'react'
import  AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import  Options from './Options';
import VideoPlayer from './VideoPlayer';
import Notification from './Notification';


export const Video = () => {
  return (
    <div>
        <AppBar style={{background:'black'}} position="static">
            
                <Typography variant='h4' color='white' align='center' >Video Chat</Typography>
        </AppBar>
        {/* Video Player */}
        {/* Options -> Notifications, Settings */}

        <VideoPlayer />
        <Options >
            <Notification />
        </Options>
    </div>
  )
}
