import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
        todo:{
             type:String,
             require:true
        }
},
{timestamps:true});

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;