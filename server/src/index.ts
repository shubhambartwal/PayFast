import express from 'express'
import rootRouter from './routes/index'
import cors from 'cors'
const app= express();
app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter)
app.listen(3000,()=>console.log("server is running"))