const express = require("express")
const app = express()

const {Server} = require("socket.io")
const connectToDatabase = require("./database")
const Book = require("./model/bookModel")

connectToDatabase()

const server = app.listen(3000,()=>{
    console.log("Running in port 3000")
})


const io = new Server(server)


//CRUD

io.on("connection",(socket)=>{
    console.log("someone is connected")


    //addBook
    socket.on("addBook",async (data)=>{
    
    try {
        if(data){
            const {bookName,bookPrice}=data
          const newBook =  await Book.create({
                bookName,
                bookPrice
            })
            socket.emit("response",{status:200,message:"Book Created Successfully",data:newBook})
        }
    } catch (error) {
        socket.emit("response",{status:500,message:"something went wrong"})
    }
    })

    //getBooks
    
    socket.on("getBook",async ()=>{
        try {
            const books=await Book.find()
            socket.emit("response",{status:200,message:"books fetched successfully",data:books})
        } catch (error) {
            socket.emit("response",{status:500,message:"something went wrong"})
        }
    })
  
    //updateBook
    socket.on("updateBook", async (data)=>{
      try {
        if(data){
        
            const{bookName,bookPrice,bookId}=data
         //    console.log(data)
            const updateBook= await Book.findByIdAndUpdate(bookId,{
             bookName,
             bookPrice
            },{new:true})
            socket.emit("response",{status:200,message:"book updated successfully", data:updateBook})
            }
      } catch (error) {
        socket.emit("response",{status:500,message:"something went wrong"})
      }
    })

   //DeleteBook

   socket.on("deleteBook",async(data)=>{
   try {
    if(data){
        const {bookId}=data
    const delBook = await Book.findByIdAndDelete(bookId)
    socket.emit("response",{status:200,message:"book deleted successfully"})
    }
   } catch (error) {
    socket.emit("response",{status:500,message:"something went wrong"})
   }
   })
})