import User from "../models/userModels.js"
import { verifyToken } from "../utils/token.js"


export const protect=async(req,res,next)=>{
    console.log("cookies =>", req.cookies);
    const token=req.cookies.access
    if(!token){
        return res.json({
            success:false,
            message:"no token login again"
        })
    }
    const SECRET=process.env.JWT_SECRET
    const decoded=verifyToken(token,SECRET)
    console.log(decoded)
    const user=await User.findById(decoded.id).select("-password")
    if(!user){
        res.json({
            success:false,
            message:"user not found"
        })
    }
    console.log(user)
    req.user=user;
    next()
}