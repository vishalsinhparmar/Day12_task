import express from 'express';
// import todoRoutes from './src/routes/todoRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db.js';
import todoRoutes from './src/routes/todoRoutes.js';
dotenv.config('./.env');
const app = express();
dbConnection()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',todoRoutes);

// app.get('/',(req,res)=>{
//      res.status(200).send("server is running")
// });

// const PORT  = 2000;

app.listen(process.env.PORT,()=>{
     console.log(`server is running http://localhost:${process.env.PORT}`)
});
// app.use('/api/todos',todoRoutes);