import jwt from "jsonwebtoken"
import config from "../config/config.js"

const createJWT=(data)=>{
    const token=jwt.sign(data, config.jwtSecret,{
        expiresIn:"30d"
    });
    return token;
}

export {createJWT};