import { FaUser } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

function CommentList({comment, setComments, comments}) {

// Convert the timestamp to a Date object
const date = new Date(comment?.createdAt);

// Define options for formatting the date
const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Format the date as "August 20, 2023"
const formattedDate = date.toLocaleDateString('en-US', options);
const authToken = localStorage.getItem('access_token');
const DeleteComment = (id) => {
  const commentIdToDelete = id; // Replace with the actual comment ID
  // console.log(commentIdToDelete)

  const apiUrl = `https://appsalabackend-p20y.onrender.com/deleteComment/${commentIdToDelete}`;
  
  const requestOptions = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  };
  
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Comment deleted successfully:', data);
      // You can update your state or perform other actions after deleting the comment
      
      const updatedComments = comments.filter(comment => comment._id !== commentIdToDelete);
      setComments(updatedComments);
    })
    .catch(error => {
      console.error('Error deleting comment:', error);
      // Handle errors here
    });
}
  return (
    <div className="comments">
    <div className="useranddata">
    <FaUser className="bin"/>
    <p className="comment-time">{formattedDate}</p>
    </div>
    <div className="commentandbin">
<p className="user-comment">{comment?.comment}</p>
  <ImBin2 className="bin" onClick={()=>DeleteComment(comment?._id)}/>
    </div>
   </div>
  )
}

export default CommentList