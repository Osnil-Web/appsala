import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import CommentList from "./CommentList";
import { updateUserData } from "../Reducers/userReducer";
// Function to sort comments by date in descending order
const sortCommentsByDate = (comments) => {
  return comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

function CommentPopup({ info }) {
  console.log(info)
  const [comment, setComment] = useState("");
  const currentComments = useSelector((state) => state.user?.products?.data?.following_app?.find((app)=> app.obj_id._id === info.obj_id._id).subscription.comment);
  // console.log('currentComments',currentComments)
  const [comments, setComments] = useState(currentComments);
 
  const authToken = localStorage.getItem("access_token");
 
  const apiUrl = `https://appsalabackend-p20y.onrender.com/comment/${info.obj_id._id}`;
  const dispatch = useDispatch();
  useEffect(() => { 
    const userId = localStorage.getItem("userId");
    // dispatch(fetchUser(null));
    dispatch(updateUserData(userId))   
    setComments(currentComments);
    // console.log('calling fetch')

  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log("Response data:", data);

      // Add the new comment to the top of the comments list with the current date
      const newComment = {comment, createdAt: new Date().toISOString() };
      setComments((prevComments) => [newComment, ...prevComments]);
      // localStorage.setItem({
      //   comments: JSON.stringify(sortCommentsByDate(comments)),
      // })
      setComment("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="comment-popup">
       <div className="comment-heading">
    <h3>My Comments</h3>  
     <p>Tell us about your experience</p>
    </div>
    <div class="line"></div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="4"
        />
        <button type="submit" className="button">Comment</button>
      </form>

      <div className="comments-section">
        <h3 className="comment-heading">Previous Comments</h3>
        {comments.map((comment, index) => (
          <CommentList key={comment._id} comment={comment} setComments={setComments} comments={comments} />
        ))}

      </div>
      </div>
)}

export default CommentPopup;

