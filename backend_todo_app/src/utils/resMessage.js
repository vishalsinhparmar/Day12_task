const sendSuccess = (res,status=200,message,data)=>{
    return res.status(status).json({
        success:true,
        message,
        data
     })
};

const sendError = (res,status=400,message,err)=>{
    return res.status(status).json({
        success:false,
        message,
        err
     })
};

export {
     sendSuccess,
     sendError
}

