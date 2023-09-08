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
  const currentRatings = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app.obj_id._id === info.obj_id._id).subscription?.user_ratings[0].rating); 
  console.log('currentRatings',currentRatings)
  const [selectedRatings, setSelectedRatings] = useState({
    Usability: info?.subscription?.user_ratings[0]?.rating?.Usability,
    Performance: info.subscription.user_ratings[0].rating.Performance,
    Features: info.subscription.user_ratings[0].rating.Features,
    Company: info.subscription.user_ratings[0].rating.Company,
    Value: info.subscription.user_ratings[0].rating.Value,
    Support: info.subscription.user_ratings[0].rating.Support,
  });
const dispatch = useDispatch();
  useEffect(() => { 
    const userId = localStorage.getItem("userId");
    // dispatch(fetchUser(null));
    dispatch(updateUserData(userId))   
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