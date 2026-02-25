import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BaseUrl } from '../main'
import ProductCard from './ProductCard'

const Product = () => {
const [data, setData]=useState([])


const getProduct=async()=>{
    const res=await axios.get(`${BaseUrl}/product/details`,{
        withCredentials:true,
    })
    // console.log(res.data.data)
    setData(res.data.data)
    

}
console.log(data)
useEffect(()=>{
    getProduct()
},[])

  return (
    <div className='flex flex-col gap-4'>
      <h2>All Products</h2>

      {data.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        data.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))
      )}
    </div>
  )
}

export default Product
