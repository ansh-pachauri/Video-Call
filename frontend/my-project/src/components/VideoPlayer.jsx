import React from 'react';
import  {Grid}  from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../SocketContent';
import { useContext } from 'react';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
}));

const StyledVideo = styled('video')({
  width: '550px',
  ['@media (max-width:600px)']: {
    width: '300px',
  },
});

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =useContext(SocketContext);


// Add useEffect to handle stream
React.useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
      console.log("Stream:", stream?.active)
console.log("Video ref:", myVideo.current)
console.log("Video srcObject:", myVideo.current?.srcObject)
    }
    
    if (stream && userVideo.current) {
        userVideo.current.srcObject = stream;
        console.log("Stream:", stream?.active)
  console.log("Video ref:", userVideo.current)
  console.log("Video srcObject:", userVideo.current?.srcObject)
      }
  }, [stream]);
  return (

    <Grid container>
      {/* Own video */}
      {stream && (
        <StyledPaper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <StyledVideo playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </StyledPaper>
      )}
      {/* User's video */}
      {callAccepted && !callEnded && (
        <StyledPaper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <StyledVideo playsInline ref={userVideo} autoPlay />
          </Grid>
        </StyledPaper>
      )}
    </Grid>
  );
};

export default VideoPlayer;