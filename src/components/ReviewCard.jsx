import reviewIcon from '../assets/img/icon-1.svg'
function ReviewCard({products}) {
    const product_list = products?.slice(0,4)
  return (
    <>

{
        product_list ? (
          product_list.map((product)=>(
            <div className="feature-card" key={product._id}>
            <img src={reviewIcon}alt=""/>
            <p className="card-heading">
                Reviews
            </p>
            <p>{product.review}</p>
        </div>
            ))
        ): <></>
           
        } 
         
    </>
  )
}

export default ReviewCard