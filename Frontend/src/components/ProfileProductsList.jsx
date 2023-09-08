
import ProfileProductItem from './ProfileProductItem'
import { useDispatch, useSelector } from 'react-redux';
function ProfileProductsList({userApps, id}) {
  const loading = useSelector((state) => state.user.loading);
  if(userApps?.length === 0){
    return (
      <h3>No item</h3>
    )
  }else{
  return (
 <>
{ userApps?.map((info)=>(
        <ProfileProductItem info={info} id={info._id}/>
       ))}

  {/* {loading ? (
        // Display a spinner while loading
        <div className="spinner"/>
      ) : userApps?.map((info)=>(
        <ProfileProductItem info={info} id={id}/>
       ))} */}
 </>
  )
}
}

export default ProfileProductsList