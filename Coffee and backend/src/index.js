import { config } from 'dotenv'; 
import connectDB from './db/index.js';
import { app } from './app.js';

const Port = process.env.PORT;

config({
  path: './.env',
});

connectDB()
.then(() =>{
  app.listen(Port || 8000 , () => {
    console.log(`Server is running at port : ${Port}`)
  })
})
.catch((err)=> {
console.log("Mongo DB connection failed !!!!",err);
})


/*
import express from "express"
(async()=>{
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",(error) => {
        console.log("error:", error);
        throw  error
      })

      app.listen(process.env.PORT , () => {
        console.log(`App is listening on PORT ${process.env.PORT}`);
      })
    } catch (error) {
        console.error("Error :", error);
        throw err
    }
})
*/