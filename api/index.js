import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import signupRouter from './routes/auth.route.js'
dotenv.config()



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('connected to db');
}).catch((err)=>{console.log(err);})
const app = express();
app.listen(3000,()=>{
    console.log('server is running on port 3000...');
})
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/auth",signupRouter)

//middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})