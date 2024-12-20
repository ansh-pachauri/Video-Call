// .js
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("server is up and running");
});

io.on('connection', (socket) => {
   socket.emit('me', socket.id);
   socket.on('disconnect',()=>{
         socket.broadcast.emit('callended');
   })

   socket.on("calluser", ({userToCall, signalData, from, name}) =>{
    io.to(userToCall).emit('calluser',{signal: signalData, from,name});
   });

   socket.on("answercall",(data)=>{
      io.to(data.to).emit("callaccepted", data.signal);
   })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});