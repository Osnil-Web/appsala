import NewLogo from '../assets/img/new-logo.png'
import facebook from '../assets/img/facebook.png'
import google from '../assets/img/google.png'
import twitter from '../assets/img/twitter.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Reducers/AuthReducer';
import { useEffect } from 'react';

function LoginPopup() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',});
const dispatch = useDispatch();
const loading = useSelector((state) => state.auth.loading);
const error = useSelector((state) => state.auth.error);
const user = useSelector((state) => state.auth.token);
const userId = useSelector((state) => state.auth.user);
const navigate = useNavigate()


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();


    let { email, password } = credentials
    dispatch(loginUser({ email, password }));
    if(error){
      alert('Wrong Email or Password')
    }
    // if (userId) {
    //           navigate(`/profile/${userId}`);
    //         }
    };

    useEffect(() => {
      if (userId) {
        navigate(`/profile/${userId}`);
      }
      if (error) {
        alert('Wrong Email or Password');
      }
    }, [userId, navigate]);

  return (
    <div className="login-pop">
      <div className='login-logo'>
      <img src={NewLogo} alt="" className='login-logo-img'/>
        <p><span>Login</span> with</p>
      </div>
        <div className="socials">
            <img src={facebook} alt="" />
            <img src={google} alt="" />
            <img src={twitter} alt="" />
        </div>
         
        <form onSubmit={handleSubmit} className= 'login-form'>
                    <div>
                        <label style={{marginRight: '10px'}}>Email</label>
                        <input
                         style={{marginLeft: '30px'}}
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                 <Link to={"/forgetpassword"} className='forget-pass'>Forget Password?</Link>
                    <button type="submit" className='button-light'>Login</button>
                </form>
    </div>
  )
}

export default LoginPopup