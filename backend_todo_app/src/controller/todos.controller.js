import mongoose from "mongoose";
import Todo from "../model/todoModel.js";
import { sendError, sendSuccess } from "../utils/resMessage.js";

const registerTodo = async(req,res)=>{
    const {todo} = req.body;
      try{
         const todoData = await Todo.create({
             todo
         });
         if(!todoData){
             return sendError(res,404,"something went wrong with creating this todo")
         };
         sendSuccess(res,201,"todo created successfully")
      }catch(err){
        console.log('error happen in this registerTodo',err.message)
      }
};

const fetchAlltodo = async(req,res)=>{  
    try{
       const todoDatalist = await Todo.find().sort({createdAt:-1});
       if(todoDatalist.length === 0){
           return sendError(res,404,"that have not any todo data")
       };
       sendSuccess(res,200,"todo fetched successfully",todoDatalist)
    }catch(err){
      console.log('error happen in this registerTodo',err.message)
    }
};

const editTododata = async(req,res)=>{
    const  {id} = req.params;
    const {todo} = req.body;
        try{
        const updateTodo = await Todo.findById(id);
        console.log('updateTodo',updateTodo);

        if(!updateTodo){
            return sendError(res,404,"that have not any todo are finding ! please try again")
        };

        await Todo.findByIdAndUpdate(id,{
           todo
        },
        {new:true}
    )
        sendSuccess(res,200,"todo updated successfully")
     }catch(err){
       console.log('error happen in this registerTodo',err.message)
     }  
};

const deleteTodo = async(req,res)=>{
    const  {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
       return sendError(res,404,"something went wrong ")
   }
        try{
        

         const deleteTodoData = await Todo.findByIdAndDelete(id);
         
         
        if(!deleteTodoData){
            return sendError(res,404,"that have not any todo are finding ! please try again")
        };

        sendSuccess(res,200,"todo deleted successfully")
     }catch(err){
       console.log('error happen in this registerTodo',err.message)
     }  
}

const todobyId =async(req,res)=>{
     const {id}  = req.params;
     try{
       const todoByid = await Todo.findById(id);
       if(!todoByid){
        return sendError(res,404,"something went wrong")
       };
       sendSuccess(res,200,"todo deleted successfully",todoByid)
       
     }catch(err){
         console.log('error hapen in this todobyId',err.message)
     }
}
export {
    registerTodo,
    fetchAlltodo,
    editTododata,
    deleteTodo,
    todobyId
};