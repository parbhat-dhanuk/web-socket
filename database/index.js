 const mongoose = require("mongoose")
 const conn = "mongodb+srv://parbhatdhanuk3:web@cluster0.owtlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase= async ()=>{
    await mongoose.connect(conn)
    console.log("connected to database")
}

module.exports =connectToDatabase