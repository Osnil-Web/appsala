import ProductCardItem from "./ProductCardItem"

function ProductCard({products}) {
  // console.log(products.data)
  const product_list = products?.slice(0,6)
  return (

    <>
       {
        product_list ? (
          product_list.map((product)=>(
                <ProductCardItem key={product._id} product = {product}/>
            ))
        ): <></>
           
        } 
    </>
    
  )
}

export default ProductCard