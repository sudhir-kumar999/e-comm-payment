import products from "../models/products.js"

export const productDetails=async(req,res)=>{
    const data=await products.find()
    // console.log(data)
    res.send({
        success:true,
        message:"product fetched",
        data:data

    })
}

