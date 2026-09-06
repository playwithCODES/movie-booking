const healthCheckUp=(req, res)=>{
    res.json({
        status:200, 
        message:"Working correctly through layered architecture"
    })
}

export default {
    healthCheckUp
}