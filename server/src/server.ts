import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config();


//* database must connected after wer declare dotenv
import { dbConnect } from './config/database.config';
dbConnect()


import foodRouter from './router/food.routers'

const app = express(); 
//*  routers need to be transformed into json format in order to function

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]

}))


app.use('/api/foods',foodRouter )



const port = 5500;
app.listen(port,()=>{
    console.log("Server is running on PORT:"+port);
    
})
