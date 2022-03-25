import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import QuestionRouter from './Routes/QuestionsRouter.js'
import UsersRouter from './Routes/UsersRouter.js';

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000;
const Mongo_url = process.env.Mongo_url;

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:false}))
app.use("/uploads",express.static('uploads'))

app.use("/",QuestionRouter);
app.use("/",UsersRouter);





mongoose.connect(Mongo_url,{useNewUrlParser:true,useUnifiedTopology:true})
                .then(() => console.log("DB Connected"))
                .then(() => app.listen(PORT,console.log(`Listening on PORT ${PORT}`)))
                .catch((err) => console.log(err.message))