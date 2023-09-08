import Button from '../components/Button'
import Products from '../components/Products'
import { useState, useEffect } from "react"
import { useParams } from 'react-router'
function ProductList() {
    const{ slug } = useParams()
    const [category, setCategory] = useState([])

    const [population, setPopulation]= useState(5)
    const handleClick = () => setPopulation(population+5)
    const product_list = category?.data?.slice(0,population)


    useEffect(() => {
      const apiCategoryUrl = `https://appsalabackend-p20y.onrender.com/category/${slug}`
    const fetchCategory = async() =>{
      try{
        const response = await fetch(apiCategoryUrl)
        const data = await response.json()
        console.log(data)
        setCategory(data)
      }
     catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
      fetchCategory()
    }, [slug])

    

 var input_string = slug
 var output_string = input_string.replace(/-/g, " ")
 var heading = input_string.replace(/-/g, " ")
    // console.log(category.data)
        return (
        <div>
           <p className="page-path">Home / {output_string}</p>
            <header className="product-header">
            <div className="product-header-inner">
            <h1 className="product-heading">
                The Best {heading} Apps in <span>2023</span>
            </h1>
        </div>
        </header>
        <div className="product-section container">
            <div className="product-question">
                <p className="question">What are Note & Writing Apps?</p>
                <p>Note-writing apps are digital tools designed to help users capture, organize, and manage their notes efficiently. These apps have become increasingly popular due to their convenience and versatility in various aspects of life, 
            both personal and professional. Here's a brief overview of note-writing apps:</p>
            </div>  
                    <Products products = {product_list}/>
                    
            <button onClick={handleClick} type="btn-border" className='button' style={{width:'auto'}}>Show More</button>
          
        </div>

        <div className="grey-footer">

        </div>
        </div>
      )
    }
    
    export default ProductList
  