
import { useEffect, useState } from "react"
function SingleProduct({slug}) {
    
    const [singleProduct, setSingleProduct] = useState([])
     useEffect(()=>{
      const apiUrl = 'https://appsalabackend-p20y.onrender.com/products'
      const fetchData = async() =>{
        const response = await fetch(apiUrl)
        const data = await response.json()
        const foundProducts = data.data.filter((product) => product.slug === slug);
        setSingleProduct(foundProducts)
      }
        fetchData()
      },[slug])
  
    

 
  return (
    <>
    <img src={singleProduct[0]?.logo} alt=""/>
    <div className="product-text">
    <p className="product-info-heading">{singleProduct[0]?.name}</p>
    <p style={{color: "#454545;"}}>{singleProduct[0]?.review}
    </p>
    <p>749  Follows</p>
    </div>
    </>
  )
}

export default SingleProduct