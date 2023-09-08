import logo from '../assets/img/logo.svg'
import {  useLocation  } from 'react-router-dom';
function Footer() {
  const location = useLocation();
  const isProfileRoute = location.pathname === '/profile' || location.pathname.startsWith('/profile/');
  if (isProfileRoute) {
  return null;
  }
  return (
    <footer>
    <img src={logo} alt=""/>
</footer>
  )
}

export default Footer