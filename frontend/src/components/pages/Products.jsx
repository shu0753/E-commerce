import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetch("http://localhost:5000/api/getProduct")
    .then((res)=>res.json())
    .then((data)=>{
      setProducts(data.productData);
    })
    .catch((err)=>console.log(err));
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/add-product")}>Add Product</button>
      
      {products.map((item)=>(
        <div key={item._id}>
          <h2>ProductName:{item.productName}</h2>
          <p>Price: {item.price}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>
        </div>
      ))

      }
    </div>



  )
}

export default Products;