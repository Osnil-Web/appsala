import { Link } from "react-router-dom"

function SeachList({filteredData}) {
  const linkStyle ={
    textDecoration: 'none',
    color: "#454545",
  }
    return (
             <div className='search-dropdown-content'>
                      {
                      Object?.entries(filteredData).map(([key, value])=>(
                        <Link style={linkStyle} to={`/${filteredData[key].slug}`}>{filteredData[key].name}</Link>
                      ))
                      
                      }
                      </div>
    
    )
  }
  
  export default SeachList