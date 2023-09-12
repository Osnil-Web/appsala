import { FaStar } from 'react-icons/fa'
import monday from '../assets/img/monday.png'
import {MdOutlineCategory} from 'react-icons/md'
import { LiaCommentSolid } from 'react-icons/lia'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useState,useEffect } from 'react'
import RatingPopup from './RatingPopup'
import StarRating from './StarRating'
import StatusPopup from './StatusPopup'
import CommentPopup from './CommentPopup'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../Reducers/userReducer'
function ProfileProductItem({info,savedApp}) {
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
const selector = (val)=>{
  if (val.startsWith('I am')){
  return 'option1'
  }if (val.startsWith('Yes')){
  return 'option2'}
  if (val.startsWith('May')){
  return 'option3'}
  if (val.startsWith('No')){
  return 'option4'}
  if (val.startsWith('No Status')){
  
    }
}
if (info?.status){
  var selectedStatus = selector(info.status)
}else{
  // setSelectedDropdownValue('option5')
  var selectedStatus = selector('No Status')
}
const dispatch = useDispatch();
const id = localStorage.getItem('userId')
useEffect(() => {
  dispatch(fetchUser(id))
  if (info?.status) {
    setSelectedDropdownValue(selector(info.status));
  } else {
    setSelectedDropdownValue('option5');
  }
}, [info]);

const [showOverlay, setShowOverlay] = useState(false);
const [commentsPopup, setCommentsPopup] = useState(false);
const [ratingPopup, setRatingPopup] = useState(false);
const [ statusPopup, setStatusPopup] = useState(false);
const handleOverlayDoubleClick = () => {
  setShowOverlay(false);
};
if(info?.subscription?.date){

  var inputDate = new Date(info.subscription.date);
  var formattedDate = inputDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}else{
  var formattedDate = ''
}

if (info?.subscription?.comment){
  var comments = info.subscription.comment.length
}else{
  var comments = 0
}

if(info?.subscription?.user_ratings[0]?.rating){
  var rating = info?.subscription?.user_ratings[0]?.rating
  var ratingValues = Object.values(rating);
  var totalValues = ratingValues.length;
  var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  var average = sum / totalValues;
}else{
  var average = 0
}

if (info?.obj_id?.logo){
  var logo = info.obj_id.logo
}else{
  var logo = info.logo
}

if (info?.obj_id?.name){
  var name = info.obj_id.name
}else{
  var name = info.name
}
if (info?.obj_id?.shortDescription){
  var shortDescription = info.obj_id.shortDescription
  const words = shortDescription.split(/\s+/);
  // Get the first 20 words
  const first20Words = words.slice(0, 20).join(" ");
  var shortDescription = first20Words + '...'
}else{
  var shortDescription = info.shortDescription
  const words = shortDescription.split(/\s+/);
  // Get the first 20 words
  const first20Words = words.slice(0, 20).join(" ");
  var shortDescription = first20Words + '...'
}
if (info?.subscription?.package){
  var subscriptionPackage =info.subscription.package
}else{
  var subscriptionPackage = ''
}
if (info?.subscription?.amount){
  var subscriptionAmount =info.subscription.amount
}else{
  var subscriptionAmount =  ''
 
}

if (info?.obj_id?.Category){
  var category =info.obj_id.Category
const convertedText = category
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  var category = convertedText
}else{
  var category = info.Category
  const convertedText = category
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  var category = convertedText
}

const handleDropdownChange = async(e) => {
  // const selectedValue = event.target.value;
  if(e.target.value === 'option1'){
    setStatusPopup(true)
    setShowOverlay(true);
    setCommentsPopup(false)
    setRatingPopup(false)
  }
  setSelectedDropdownValue(e.target.value);
  // var selectedValue = selector(e.target.value)
  
  if (e.target.value === 'option1'){
    var currentStatus = 'I am using it 👍'}
    if (e.target.value === 'option2'){
      var currentStatus = 'Yes, i want to 🤩'}
      if (e.target.value === 'option3'){
        var currentStatus = 'Maybe 🤔'}
        if (e.target.value === 'option4'){
          var currentStatus = "No, i don't 😑"}
          

  const applicationID = info?.obj_id?._id ? info?.obj_id?._id : info?._id;
  const apiUrl =`https://appsalabackend-p20y.onrender.com/update-status/${applicationID}`
  console.log(applicationID)

  const authToken = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: currentStatus }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log('done calling')
};

const handleCommentPopup = () => {
  setShowOverlay(true);
  setCommentsPopup(true)
  setRatingPopup(false)
  setStatusPopup(false)
}

const handleRatingPopup = () => {
  setShowOverlay(true);
  setCommentsPopup(false)
  setRatingPopup(true)
  setStatusPopup(false)
}

  return (
    <>
        <div className="profile-products-list">
        <div className='profile-product-image'>
        <img src={logo} alt="" style={{height:'60px'}}/>
        </div>
        <div>
        <div className='aligned'>
        <h3 style={{color: 'black'}}>{name}</h3>
        <div className="stars">
        <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
        </div>
        <p>(149 Follows)</p>
        </div>
        <p> {shortDescription}</p>
        <div className='aligned'>
            
            <div  className='aligned'>
            <MdOutlineCategory/>
            <p>Marketing</p>
            <FaArrowCircleRight/>
            <p>{category}</p>
            </div>
         
           
          {
            !savedApp ? 
            <>
            <p style={{marginRight: '4px'}}>My Rating</p>
        <div className="stars"  onClick={handleRatingPopup}>
        <StarRating rating={average}/>
        </div>
            </>  : ''
          }
       
   
       {
        !savedApp ?   <>
        <LiaCommentSolid onClick={handleCommentPopup} style={{marginRight: '4px'}}/>
         <p>comment <span style={{color: '#00A82D'}}>({comments})</span></p>
        </> : ''
       }
          
        </div>
        </div>
        <div style={{marginTop: '20px'}}>
        <div>
        <select id="dropdown" onChange={handleDropdownChange} value={selectedDropdownValue} >
        <option value="option1" name='hello'>🟢 I am using it </option>
        <option value="option2"  name='Yes, I want to 🤩'>🟢 Yes, I want to </option>
         <option value="option3"  name='May be 🤔'>🟢 May be 🤔</option>
         <option value="option4" name="'No, I don't 😐'">🟢 No, I don't </option>
         <option value="option5" name="No Status">⚫ Select</option>
        </select>
          </div>
          <p>{subscriptionPackage} {subscriptionAmount}
          {
            subscriptionPackage && <>$</>
          }
          </p>
          <p>{formattedDate}</p>
        </div>
    </div>

    {showOverlay && commentsPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={info} id={id}/>
        </div>
  )}

  {showOverlay && ratingPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup info={info} setRatingPopup={setRatingPopup} id={id}/>
        </div>
  )}

{showOverlay && statusPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <StatusPopup info={info} id={id} setShowOverlay={setShowOverlay} setStatusPopup={setStatusPopup}/>
        </div>
  )}
    </>
  )
}

export default ProfileProductItem