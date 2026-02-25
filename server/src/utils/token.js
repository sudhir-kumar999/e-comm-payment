import jwt from "jsonwebtoken"

export const generateToken=(id,secret)=>{
    return jwt.sign({id},secret)
}

export const verifyToken=(token,secret)=>{
    return jwt.verify(token,secret)
}