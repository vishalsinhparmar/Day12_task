import mongoose from "mongoose";
const dbConnection = async()=>{
     try{
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log('db connection successfully');
     }catch(err){
         console.log('error hapen in the db connection',err.message)
     }
};

export default dbConnection;