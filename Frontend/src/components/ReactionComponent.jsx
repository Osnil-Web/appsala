import React, { useState, useEffect } from 'react';

function ReactionComponent({currentStatus,isDisabled,product}) {
  // console.log(product)
  // console.log(type  currentStatus);
  if(currentStatus){
    if(currentStatus.startsWith("I am")){
      currentStatus = "thumbs-up"
    }if (currentStatus.startsWith("Yes")){
      currentStatus = "excited"
    }if (currentStatus.startsWith("May")){
      currentStatus = "maybe"
    }if (currentStatus.startsWith("No")){
      currentStatus = "thumbs-down"
    }
  }

  
  
  useEffect(() => {
    // If the currentStatus prop changes, update selectedReaction
    setSelectedReaction(currentStatus);
  }, [currentStatus]);
  const [selectedReaction, setSelectedReaction] = useState(currentStatus);

  const handleReactionClick = async(reaction, value) => {
    if(isDisabled){
      setSelectedReaction(null)
    }else{
      setSelectedReaction(reaction);
      console.log(typeof(value))
      const apiUrl =`https://appsalabackend-p20y.onrender.com/update-status/${product?._id}`
      const authToken = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: value }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log('done calling')

    }


    // console.log(value)
    // console(reaction)


  };

  return (
    <div className="comment-div">
      <div
        className={`reaction ${selectedReaction === 'thumbs-up' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('thumbs-up', 'I am using it 👍')}
        value = 'I am using it 👍'
      >
        I am using it 👍
      </div>
      <div
        className={`reaction ${selectedReaction === 'excited' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('excited','Yes, i want to 🤩')}
        value = 'Yes, I want to 🤩'
      >
        Yes, I want to 🤩
      </div>
      <div
        className={`reaction ${selectedReaction === 'maybe' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('maybe','Maybe 🤔')}
        value = 'May be 🤔'
      >
        May be 🤔
      </div>
      <div
        className={`reaction ${selectedReaction === 'thumbs-down' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('thumbs-down',"No, i don't 😑")}
        value = "No, I don't 😐"
      >
        No, I don't 😐
      </div>
    </div>
  );
}

export default ReactionComponent;
