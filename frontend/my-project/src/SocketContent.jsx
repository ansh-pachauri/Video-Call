import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:5000");

const ContestProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });


    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isRecievedCall: true, from, name: callerName, signal });
    });

   
  }, []);

  const answercall = () => {
    setCallAccepted(true);
    //in peer these are props which are used in video call feature
    const peer = new Peer({
      initiator: false, //we are answering not initating
      trickle: false, // Don't use ICE trickling
      stream, //local video/audio stream
    });

    peer.on("signal", (data) => {
      socket.emit("answercall", {
        to: call.from, // Send to caller
        signal: data, // Connection data
      });
    });

    //displaying the remote video on screen
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal); // Process caller's signal
    connectionRef.current = peer; // Store connection
  };

  const callUser = () => {
    const peer = new Peer({
      initiator: true, //we are initating not answer
      trickle: false, // Don't use ICE trickling
      stream, //local video/audio stream
    });

    peer.on("signal", (data) => {
        socket.emit("callUser", {
          userTocall : id,
          signalData : data,
          from : me,
          name
        });
      });

    peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
      
    socket.on("callaccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

    connectionRef.current = peer;  
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answercall
     }}>
       {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContestProvider };
