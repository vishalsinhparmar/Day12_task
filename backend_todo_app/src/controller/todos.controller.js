import mongoose from "mongoose";
import Todo from "../model/todoModel.js";
import { sendError, sendSuccess } from "../utils/resMessage.js";
import todoSchema from "../utils/validate.js";



console.log('todo schema',todoSchema)
const registerTodo =     async(req,res)=>{
    const {todo} = req.body;
    const {error} = todoSchema.validate(req.body);
    if(error){
         return sendError(res,400,error.details[0].message)
    }
      try{
         const todoData = await Todo.create({
             todo
         });
         if(!todoData){
             return sendError(res,500,"falild to create a todo")
         };
         sendSuccess(res,201,"todo created successfully")
      }catch(err){
        console.error('error happen in this registerTodo',err)
        return sendError(res,500,"internal server error")
      }
};

const fetchAlltodo = async(req,res)=>{  
    try{
       const todoDatalist = await Todo.find().sort({createdAt:-1});
       if(todoDatalist.length === 0){
           return sendError(res,404,"no todo found")
       };
       return sendSuccess(res,200,"todo fetched successfully",todoDatalist)
    }catch(err){
      console.error('error happen in this registerTodo',err);
      return sendError(res,"internal server error",500)
    }
};

const editTododata = async(req,res)=>{
    const  {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
         return sendError(res,400,"invalid Id")
    }
    const {todo} = req.body;
    const {error} = todoSchema.validate(req.body);
        try{
            if(error){
                 return sendError(res,400,error.details[0].message)
            }
        const updateTodo = await Todo.findById(id);
        console.log('updateTodo',updateTodo);

        if(!updateTodo){
            return sendError(res,404,"Todo not found")
        };

        await Todo.findByIdAndUpdate(id,{
           todo
        },
        {new:true}
    )
        return sendSuccess(res,200,"todo updated successfully")
     }catch(err){
       console.error('error happen in this registerTodo',err)
     }  
};

const deleteTodo = async(req,res)=>{
    const  {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
       return sendError(res,404,"Invalid ID")
   }
        try{
        

         const deleteTodoData = await Todo.findByIdAndDelete(id);
         
         
        if(!deleteTodoData){
            return sendError(res,404,"todo not found")
        };

        sendSuccess(res,200,"todo deleted successfully")
     }catch(err){
       console.error('error happen in this deleteTodo',err)
       return sendError(res,500,"server error.");
     }  
}

    const completedTodoupdt = async(req,res)=>{
        const {completed}= req.body;
        const{id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return sendError(res,404,"Invalid ID")
        }

        try{
            const todo = await Todo.findByIdAndUpdate(id,{
                completed:completed
            },
            {new:true}
        );

        if(!todo){
            return sendError(res,400,"todo are not updated")
        };

        return sendSuccess(res,201,"todo updated successfully")
        }catch(err){
            console.log('error happen in the completedTodo',err.message)
        }
    }

const todobyId =async(req,res)=>{
     const {id}  = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return sendError(res,404,"Invalid ID")
    }

     try{
       const todoByid = await Todo.findById(id);
       if(!todoByid){
        return sendError(res,404,"something went wrong")
       };
       sendSuccess(res,200,"todo deleted successfully",todoByid)
       
     }catch(err){
         console.error('error hapen in this todobyId',err)
         return sendError(res,500,"server error.");

     }
};

const fetchAllcompletedTodo = async(req,res)=>{
      try{
         const completedTodo = await Todo.find({completed:true});
         if(!completedTodo){
             return sendError(res,400,"not find any completed todos")
         };

        return sendSuccess(res,200,"fetch all completed todos",completedTodo);
      }catch(err){
        console.error('error happen in this completedTodo',err.message)
        return sendError(res,500,"Internal error")
      }
}
export {
    registerTodo,
    fetchAlltodo,
    editTododata,
    deleteTodo,
    todobyId,
    completedTodoupdt,
    fetchAllcompletedTodo
};