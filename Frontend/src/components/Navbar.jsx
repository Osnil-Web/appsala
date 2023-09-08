import logo from '../assets/img/new-logo.png'
import seachIcon from '../assets/img/search.svg'
import Button from './Button'
import Menu from './Menu';
import { useEffect, useState  } from "react"
import SeachList from './SearchList';
import { Link,useLocation  } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Reducers/AuthReducer';

function Navbar({products}) {
  const userId = localStorage.getItem('userId')
  const user = useSelector((state) => state.auth.isAuthenticated);
   const [categories, setCategories] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchCategories()
  },[])
  const apiCategoryUrl = 'https://appsalabackend-p20y.onrender.com/category'

  const fetchCategories = async() =>{
    try{
      const response = await fetch(apiCategoryUrl)
      const data = await response.json()
      setCategories(data)
    }
   catch (error) {
    console.error('Error fetching categories:', error);
  }
}
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('')
  const [searching, setSearching] = useState(false)
  const [dataFilter, setDataFilter] = useState('')
  const [isBlogMenuOpen, setBlogMenuOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleLoginPopup = () => {
    if (user){
      dispatch(logoutUser())
      window.location.reload();
    }else{
      setLoginPopupOpen(true);
      setRegisterPopup(false);
      setShowOverlay(true);
    }  
  }
  const handleRegisterPopup = () => {
    setRegisterPopup(true);
    setLoginPopupOpen(false);
    setShowOverlay(true);
  }

const handleOverlayDoubleClick = () => {
  setShowOverlay(false);
};
  const handleMouseEnter = (e) => {

    if (e.target.innerHTML === 'Categories'){
      setMenuOpen(true);
    }if (e.target.innerHTML === 'Blog'){
      setBlogMenuOpen(true);
    }

  };

  const handleMouseLeave = () => {
    setSearching(false)
    setMenuOpen(false);
    setBlogMenuOpen(false);
    setDataFilter('')
  };
const onHandleChange =(e)=>{
 setSearchVal(e.target.value)
 setSearching(true)
 filterData()
}
const onHandleClick=(e)=>{
  setSearching(true)
 }

const filterData= () =>{
  const filteredData = products?.data?.filter((item) =>
  item.name.toLowerCase().includes(searchVal.toLowerCase())
  );
  setDataFilter(filteredData)
}
const location = useLocation();

// Do not render the navbar on the "Dashboard" page
const isProfileRoute = location.pathname === '/profile' || location.pathname.startsWith('/profile/');

if (isProfileRoute) {
  return null;
}
  return (
    <div>
          {showOverlay && loginPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <LoginPopup/>
        </div>
  )}

{showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup/>
        </div>
  )}

        <nav >
        
            <div className="navbar">
              <div>

              
            <div className="logo">
            <Link to={"/"} >
                <img src={logo} alt=""/>
                </Link>
            </div>
            <div className="menu">
                <ul className="hover-menu-container">
                 
                    <li className='dropdown' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Link to={"/"} >Categories</Link>
                
                    {isMenuOpen && (
                      <div>
      <Menu childs={categories} />
      </div>)}
        </li>
     
                    <li className='dropdown' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><a href="/">Blog</a>
                    {isBlogMenuOpen && (
                       <div >
      <Menu/></div>)}
                    </li>
                   
                </ul>
            </div>
            </div>
            <div>
            <div className="search">
                <form>
                    <input onChange={onHandleChange} onClick={onHandleClick} onMouseEnter={handleMouseEnter} value={searchVal} type="text" id="search"  placeholder="Search" autoComplete="off"/>
                    { searching && dataFilter.length > 0 && (
                       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SeachList filteredData={dataFilter}/></div>)}
                  </form>
            </div>
            <div >
            <div className="nav-buttons">
           <button type ='btn-light' className='button' onClick={()=> handleLoginPopup() }>{
            user ? 'Logout' : 'Login'
}</button>
          {
                user ? <><button type ='btn-light' className='button-light'>
                  <Link to = {`/profile/${userId}`} 
                  className='link'
                  style={{ textDecoration: 'none'}}
                  >
                  Dashboard
                  </Link>
                  </button></>: <button type ='btn-light' className='button-light' onClick={()=> handleRegisterPopup() }>Register</button>
          }
         
    
           </div>
        </div>
        </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar