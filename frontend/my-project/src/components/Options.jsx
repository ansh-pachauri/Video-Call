

import React, {useState, useContext} from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../SocketContent';
import { PhoneDisabled, Phone } from '@mui/icons-material';

const RootWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
}));

const MarginWrapper = styled('div')({
  marginTop: 20,
});



// Usage in component:
const Options = ({ children }) => {

    const {me, callAccepted, name, setName, callEnded,  leaveCall,callUser} =  useContext(SocketContext);
const [idToCall,setIDtoCall] = useState('');

  return (
    <RootWrapper >
      <StyledContainer>
        <StyledGrid container>
          <MarginWrapper>
            {/* Your content here */}
            <Typography gutterBottom variant="h6" fullWidth align="center">Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={() => callUser(idToCall)}>Call User</Button>
            <CopyToClipboard text={me}>
              <Button variant="contained" color="primary">Copy ID</Button>
            </CopyToClipboard>
             </MarginWrapper>
        </StyledGrid>

        <StyledGrid container>
          <MarginWrapper>
            {/* Your content here */}
            <Typography gutterBottom variant="h6" fullWidth align="center">Make a call</Typography>
            <TextField fullWidth label="ID to call" value={idToCall} onChange={(e) => setIDtoCall(e.target.value)} />
            {callAccepted && !callEnded ?(
                <Button variant='contained' color='secondary'
                startIcon={<PhoneDisabled fontSize='large' />}
                fullWidth 
                onClick={leaveCall}>Hang Up</Button>
            ) : (
                <Button variant='contained' color='primary'
                startIcon={<Phone fontSize='large' />}
                fullWidth 
                 onClick={() => callUser(idToCall)}>Call User</Button>
)}
            
            <Paper elevation={3}>{children}</Paper>
          </MarginWrapper>
        </StyledGrid>

      </StyledContainer>
    </RootWrapper>
  );
};

export default Options;