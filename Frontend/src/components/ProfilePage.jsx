import { PiPencilDuotone, PiPencilSlashDuotone } from 'react-icons/pi'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser ,updateUser} from '../Reducers/userReducer'
// import { signupUser } from '../Reducers/AuthReducer';
function ProfilePage() {
  
  // // const {name, email} = user
  // useEffect(() => {
    
  // }, [user])
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  var name = user.products.data.name
  var email = user.products.data.email

  const [edit, setEdit] = useState({
    nameEdit: false,
    emailEdit: false,
  })
  // const [credentials, setCredentials] = useState({
  //   email: email,
  //   password: '',
  //   name: name,
  //   confirmPassword: '',
  // });
  
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [form, setForm] = useState({
    name: name,
    email: email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.newPassword !== form.confirmPassword){
      alert('password does not match')
    }
    else{
    let { currentPassword, newPassword } = form
    dispatch(updateUser({ currentPassword, newPassword }));
    console.log('password updated')
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let { name, email } = form
    dispatch(updateUser({ name, email }));
    console.log('updated')
  }    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
    }));
  };
  
  return (
    <div className="profile-page">
      <h1>
      My Profile
      </h1>
      <div className="sep-line"></div>
      <form action="">
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value={form.name} placeholder={name}  disabled={!edit.nameEdit} name="name" onChange={handleChange} />
          {
            edit.nameEdit ? <PiPencilSlashDuotone className='profile-icon' onClick={() => setEdit({...edit, nameEdit: false})}/> : <PiPencilDuotone className='profile-icon' onClick={() => setEdit({...edit, nameEdit: true})}/>
          }
          {/* <PiPencilDuotone className='profile-icon'/> */}
        </div>
        <div>
          <label htmlFor="">Email </label>
          <input type="text"  value={form.email} placeholder={email} disabled={!edit.emailEdit} name="email" onChange={handleChange}/>
          {
            edit.emailEdit ? <PiPencilSlashDuotone className='profile-icon' onClick={() => setEdit({...edit, emailEdit: false})}/> : <PiPencilDuotone className='profile-icon' onClick={() => setEdit({...edit, emailEdit: true})}/>
          }
          {/* <PiPencilDuotone  className='profile-icon'/> */}
        </div>
        <button className="profile-button-light" onClick={handleUpdate}>Update</button>
      </form>
      <div className="sep-line"></div>
      <div className="update-password">
        <div className="reset-pass">
        <h3>Update Password</h3>
        {/* <button className="reset-pass-button button">Reset Password</button> */}
        </div>
       
        <form action="">
          <div className='form-div'>
            <label htmlFor="">Curent Password</label>
            <div>
            <input type={showPassword.currentPassword ? 'text' : 'password'} name="currentPassword"  value={form.currentPassword}  onChange={handleChange}/>
            {
              showPassword.currentPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, currentPassword: false})}/> : 
              <AiOutlineEyeInvisible className='profile-icon' onClick={() => setShowPassword({...showPassword, currentPassword: true})}/>
            }
            {/* <AiOutlineEyeInvisible  className='profile-icon'/> */}
            </div>
          </div>
          <div className='form-div'>
            <label htmlFor="">New Password</label>
            <div>
            <input type={showPassword.newPassword ? 'text' : 'password'}  value={form.newPassword} name="newPassword" onChange={handleChange}/>
            {
              showPassword.newPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, newPassword: false})}/> : 
              <AiOutlineEyeInvisible  className='profile-icon' onClick={() => setShowPassword({...showPassword, newPassword: true})}/>
            }
           
            </div>
           
          </div>
          <div className='form-div'>
            <label htmlFor="">Confirm Password</label>
            <div>
            <input type={showPassword.confirmPassword ? 'text' : 'password'}  value={form.confirmPassword} name="confirmPassword" onChange={handleChange}/>
            {
              showPassword.confirmPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, confirmPassword: false})}/> :
              <AiOutlineEyeInvisible className='profile-icon' onClick={() => setShowPassword({...showPassword, confirmPassword: true})}/>
           }
      
            </div>
          </div>
          <button className="profile-button-light" onClick={handleSubmit}>Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage