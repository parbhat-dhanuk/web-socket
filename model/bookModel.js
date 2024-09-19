const mongoose = require("mongoose")


const bookSchema=new mongoose.Schema({
    bookName:String,
    bookPrice:Number

})

const Book = mongoose.model("book",bookSchema)

module.exports = Book