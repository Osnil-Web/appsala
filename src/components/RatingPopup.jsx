import { useState, useEffect } from 'react';
import { updateUserData } from "../Reducers/userReducer";
import { useDispatch,useSelector } from "react-redux";
import StarRating from './StarRating';
function RatingPopup({info,setRatingPopup}) {
  const applicationId = info.obj_id._id
  const authToken = localStorage.getItem('access_token')
  console.log(info)
  const apiUrl = `https://appsalabackend-p20y.onrender.com/rating/${applicationId}`; 
  // const [rating, setRating] = useState(0);
  var currentRatings = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app.obj_id._id === info.obj_id._id).subscription?.user_ratings); 
  var currentRatings = useSelector((state) => state.user?.products?.data?.following_app?.find((app) => app.obj_id._id === info.obj_id._id).subscription?.user_ratings);

  // Check if currentRatings is an empty array and assign a default value if it is
  if (Array.isArray(currentRatings) && currentRatings.length > 0 && currentRatings[0]?.rating) {
    currentRatings = currentRatings[0]?.rating;
  } else {
    currentRatings = []; // Replace 'defaultValue' with the value you want to assign when user_ratings is an empty array
  }
  
  // Now you can use 'currentRatings' with confidence
  
  const userRatings = info?.subscription?.user_ratings[0]?.rating || {};
  console.log(userRatings)

  const [selectedRatings, setSelectedRatings] = useState({
    Usability: userRatings.Usability || 0, // Set a default value (e.g., 0) if Usability rating is missing
    Performance: userRatings.Performance || 0, // Set a default value if Performance rating is missing
    Features: userRatings.Features || 0, // Set a default value if Features rating is missing
    Company: userRatings.Company || 0, // Set a default value if Company rating is missing
    Value: userRatings.Value || 0, // Set a default value if Value rating is missing
    Support: userRatings.Support || 0, // Set a default value if Support rating is missing
  });

  const userId = localStorage.getItem("userId");
const dispatch = useDispatch();
  useEffect(() => { 

    // dispatch(fetchUser(null));
   
    setSelectedRatings(currentRatings)
    // console.log('calling fetch')

  }, []);

  function handleStarClick(aspect, value) {
    // console.log(aspect, value);
    setSelectedRatings(prevRatings => ({
      ...prevRatings,
      [aspect]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: selectedRatings }),
    };
    console.log(requestOptions)
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      // setSelectedRatings(currentRatings)
      console.log('Response data:', data);
       dispatch(updateUserData(userId))   
      // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  }
  // console.log(info.obj_id.rating)
  return (
    <div className="rating-popup">
      <div className="rating-heading">
        <h3>My Ratings</h3>  
      <p>Rate the app based on your experience.</p>
    </div>
    <div class="line"></div>
    <div className="ratings">
      <div className='rating-item'>
        <p>Usability</p><StarRating aspect='Usability' average={info.obj_id.rating.Usability} rating={selectedRatings.Usability} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating-item'>
        <p>Performance</p><StarRating aspect='Performance' average={info.obj_id.rating.Perfomance} rating={selectedRatings.Performance} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating-item'>
        <p>Features</p><StarRating aspect='Features' average={info.obj_id.rating.Features} rating={selectedRatings.Features} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating-item'>
        <p>Company</p><StarRating aspect='Company' average={info.obj_id.rating.Company} rating={selectedRatings.Company} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating-item'>
        <p>Value</p><StarRating aspect='Value' average={info.obj_id.rating.Value} rating={selectedRatings.Value} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
      <div className='rating-item'>
        <p>Support</p><StarRating aspect='Support' average={info.obj_id.rating.Support} rating={selectedRatings.Support} setSelectedRatings={setSelectedRatings} handleStarClick={handleStarClick}/>
      </div>
    </div>
    <div className="rating-buttons">
    <button className="button" onClick={()=> setRatingPopup(false)}>Cancel</button>
    <button className="button-light" onClick={handleSubmit}>Rate</button>
    </div>
    </div>
  )   

}

export default RatingPopup