
// import monday from '../assets/img/monday.png'
import { Link } from 'react-router-dom'
import { LiaCommentSolid } from 'react-icons/lia'
import { FaStar } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import StarRating from './StarRating'
// import StarRating from './StarRating'
import { selectUser } from '../Reducers/userReducer'
import { useSelector } from 'react-redux';
import LoginPopup from './LoginPopup'
import ReactionComponent from './ReactionComponent'
import CommentPopup from './CommentPopup'
import RatingPopup from './RatingPopup'

function ProductItem({product}) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [loginPopupOpen, setLoginPopupOpen] = useState(false);
    const [commentPopupOpen, setCommentPopupOpen] = useState(false);
    const [ratingPopupOpen, setRatingPopupOpen] = useState(false);
    // const [registerPopup, setRegisterPopup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const user = useSelector(selectUser)
    const auth = useSelector((state) => state.auth)
    // const currentRatings = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app.obj_id._id === info.obj_id._id).subscription?.user_ratings[0].rating);
    const [followingAppRating, setFollowingAppRating] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [followingAppComments, setFollowingAppComments] = useState([])
    const [followingAppCommentList, setFollowingAppCommentList] = useState([])
    const [currentStatus, setCurrentStatus] = useState('')

    var shortDescription = product.shortDescription
    const words = shortDescription.split(/\s+/);
    // Get the first 20 words
    const first20Words = words.slice(0, 20).join(" ");
    var shortDescription = first20Words + '...'

      const handlePopup = () => {
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setLoginPopupOpen(true)
        }else{
          if(isFollowing){
            setShowOverlay(true)
            setLoginPopupOpen(false)
            setCommentPopupOpen(true)
        }
      }
      }
      const handleLoginPopup = () => {
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setLoginPopupOpen(true)
        }
      }
      const handleRatingPopup = () => {
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setLoginPopupOpen(true)
        }else{
          if(isFollowing){
            setShowOverlay(true)
            setLoginPopupOpen(false)
            setCommentPopupOpen(false)
            setRatingPopupOpen(true)
          }
        }
      }
      const handleOverlayDoubleClick = () => {
        setShowOverlay(false);
      };
    useEffect(() => {
        if (auth.isAuthenticated) {
            const following_apps = user?.products?.data?.following_app?.map((app)=>app.obj_id._id)
            following_apps?.forEach((appId) => {
                if (appId === product._id) {
                  // console.log('following', appId);
                  setIsFollowing(true)
                 setFollowingAppRating(user.products.data.following_app.find((app)=> app.obj_id._id === product._id).subscription?.user_ratings[0]?.rating)
                 setFollowingAppCommentList(user.products.data.following_app.find((app)=> app.obj_id._id === product._id).subscription.comment)
                 setFollowingAppComments(user.products.data.following_app.find((app)=> app.obj_id._id === product._id))
                setCurrentStatus(user.products?.data?.following_app?.find((app)=> app?.obj_id?._id === product?._id)?.status)
                } else {
                  console.log('not following');
                }
              });
            }
      }, []);


const average_calculator = (rating) =>  {
  //var rating = followingAppRating
  var ratingValues = Object.values(rating);
  var totalValues = ratingValues.length;
  var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  var average = sum / totalValues;
  return average
}
      if(followingAppRating){
        var average = average_calculator(followingAppRating)
        
      }else{
        var average = 0
      }
      
  var product_rating = product?.rating || 0
  var product_average_rating  = average_calculator(product_rating)

  return (
    <>
           {showOverlay && loginPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <LoginPopup/>
        </div>
  )}
    
   {showOverlay && commentPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={followingAppComments}/>
        </div>
  )}
    {showOverlay && ratingPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup info={followingAppComments} setRatingPopup={setRatingPopupOpen}/>
        </div>
  )}
     <div className="product-info">
    <div className="product-card">
            <div className="product-reviews-card">
                <div>
                    <img src={product.logo}alt="" style={{height: '50px'}}/>
                </div>
                <div className="details">


<Link to={`/${product.slug}`} className='product-link'> {product.name}</Link>
                    <div className="stars">
                        <StarRating rating={product_average_rating} isDisabled ={true} />
                    </div>
                    <div className="ratings">
                        <p>{product.averageRating}<span>(149 Follows)</span></p>
                    </div>
                </div>
            </div>
            <div>
            <p style={{ fontSize: "20px" ,color: "#757575"}}>
                {
                    shortDescription
                }
            </p>
            <div className='comment-rating'>
            <div className='my-rating' onClick={handleRatingPopup}>
                <p>My Rating </p>
            {
                isFollowing ? <StarRating rating={average}/> : <StarRating isDisabled ={true} />
            }
            {/* <StarRating average={average}/> */}
            </div>
   
        <div className='my-comments' onClick={handlePopup} style={{cursor: 'pointer'}}>
        <LiaCommentSolid />
        {
            isFollowing ? 
            <p>comment <span style={{color: '#00A82D'}}>({followingAppCommentList.length})</span></p>
          : <p className='no-comment' onClick={handlePopup}>Comment</p>
        }
        {/* <p>comment {followingAppComments.length} </p> */}
        </div>
        </div>
            </div>
           
        </div>
       
            <div className="product-bar" onClick={handleLoginPopup}>
                <p>
                    Do you wish to use {product.name}?
                </p>
                {
                    isFollowing ? <ReactionComponent currentStatus={currentStatus} product={product}/> : <ReactionComponent isDisabled={isDisabled}/>
                }
                {/* // <ReactionComponent currentStatus={currentStatus}/> */}
            </div>
            </div>
            </>
  )
}


export default ProductItem