const express = require('express');
const PORT = 1000;
const server = express();
const router = require('./router/Router');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

//connection with db
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USERID}:${process.env.DB_PASSWORD}@cluster0.hlwrgzl.mongodb.net/?retryWrites=true&w=majority`);
  //await mongoose.connect('mongodb://127.0.0.1:27017/nodejs');
  console.log('database connected')
}

//Middlewares
server.use(cookieParser())
server.use(express.json());
server.use(express.urlencoded());
server.use('/api',router.router)


//server connection
server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})