import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useMemo, useState } from 'react';
function StarRating({ average, color, rating, handleStarClick, aspect }) {
  const [hover, setHover] = useState(null);

    const averageRating = Math.floor(average)
    const getColor = (idx) => {
      if(hover >= idx) {return '#F11A7B'}
      else if(!hover && rating >= idx){return '#F11A7B' }
      return  '#D9D9D9'
    }

    const renderStars = useMemo(() => {
        return Array(5).fill(0).map((_, i) => i+1).map((idx) => {
          return <FontAwesomeIcon 
          icon={faStar} 
          key={idx} 
          onClick={() => handleStarClick(aspect,idx)} 
          onMouseEnter={()=>setHover(idx)}
          onMouseLeave={()=> setHover(null)}
          style={{color:getColor(idx)}}/>})
    }, [average, rating,hover])

    return <div>{renderStars}</div>;
  }

  StarRating.defaultProps = {
    average: 5,
    rating: 0,
    color: {
        filled: '#F11A7B',
        unfilled: '#D9D9D9',
    }
  }

  export default StarRating;