const express =require("express")
const app=express()

const {Server} = require("socket.io")



 const server = app.listen(3000,()=>{
    console.log("Server has started in port 3000")
})


const io = new Server(server)

io.on("connection",(socket)=>{
   
    console.log("someone has connected")

    // socket.emit("hi",{
    //     greeting:"Hello parbhat dhanuk"
    // })
    // socket.on("sendData",(data)=>{
    //     if(data){
    //         io.to(socket.id).emit("response","Thankyou your data is received")
    //         // socket.emit("response","Thankyou your data is received")
    //     }
    // })

    socket.on("message",(data)=>{
     if(data){
        io.to(socket.id).emit("message",data)
     }
    })
    // socket.on("disconnect",()=>{
    //     console.log("disconnected a user")
    // })
})