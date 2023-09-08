import NewLogo from '../assets/img/new-logo.png'
import facebook from '../assets/img/facebook.png'
import google from '../assets/img/google.png'
import twitter from '../assets/img/twitter.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Reducers/AuthReducer';

function RegisterPopup() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
const dispatch = useDispatch();
const loading = useSelector((state) => state.auth.loading);
const error = useSelector((state) => state.auth.error);
const user = useSelector((state) => state.auth.isAuthenticated);
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
    if(credentials.password !== credentials.confirmPassword){
      alert('password does not match')
    }else{
    let { email, password, name } = credentials
    dispatch(signupUser({ email, password, name }));
    if (user) {
              navigate(`/profile/${userId}`);
            }
    };

    // let { email, password } = credentials
    // dispatch(loginUser({ email, password }));
    // if (user) {
    //           navigate(`/profile/${userId}`);
    //         } else {
    //           alert('wrong email or password');
    //         }
    };

  return (
    <div className="login-pop">
      <div className='login-logo'>
      <img src={NewLogo} alt="" className='login-logo-img'/>
        <p className='bold-text'>Register</p>
        <p  className='small-text'><span>Register</span> and Start using the crazy features on Appsala</p>
      </div>
         
        <form onSubmit={handleSubmit} className= 'register-form'>
                    <div>
                        <label style={{marginRight: '10px'}}>Name</label>
                        <input
                         style={{marginLeft: '30px'}}
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
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
                    <div>
                        <label
                        style={{marginLeft: '-40px'}}
                        >Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='term-radio'>
                        <input
                            type="checkbox"
                        />
                        <p className='term'>By creating an account, you agree to our Terms & Conditions</p>
                    </div>
                    <div className='register-button-div'>
                    <button type="submit" className='button-light'>Register</button>
                    <p className='registered'> Already Registered?
                 <Link to={"/forgetpassword"}> Login</Link></p>
                    </div>
                </form>
    </div>
  )
}

export default RegisterPopup