import React, { useState, useEffect } from 'react'; // Import useEffect and useState

import ProfileProductItem from './ProfileProductItem';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

function ProfileProductsList({ userApps, id, savedApp }) {
  const loading = useSelector((state) => state.user.loading);

  // State to control whether to show the spinner or content
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Use a setTimeout to hide the spinner after 2 seconds
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 3000); // 2000 milliseconds (2 seconds)

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, []); // Empty dependency array to run this effect only once

  if (userApps?.length === 0) {
    return <h3 style={{color:'#585858'}}>No items</h3>;
  }
    return (
      <>
        {userApps?.map((info) => (
          <ProfileProductItem info={info} id={info._id} key={info._id} savedApp={savedApp} />
        ))}
      </>
    );
  
}

export default ProfileProductsList;
