import performance from '../assets/img/performance.png'
import dog from '../assets/img/dog.png'
import ankr from '../assets/img/ankr.png'
import notification from '../assets/img/notification1.png'
import notepad from '../assets/img/notepad2.png'
import pana from '../assets/img/pana.png'
import board from '../assets/img/board.png'
import woman from '../assets/img/woman.png'
import girl from '../assets/img/girl.png'
import man from '../assets/img/man.png'
import battery from '../assets/img/battery.png'
import mask from '../assets/img/mask.png'
import footerBanner from '../assets/img/footer-banner.png'
import hands from '../assets/img/hands.png'
import ProductCard from '../components/ProductCard'
import { TiTick } from "react-icons/ti";
import RegisterPopup from '../components/RegisterPopup'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Home({products}) {
  const user = useSelector((state) => state.auth.isAuthenticated);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleRegisterPopup = () => {
    if(user){
      alert('You are already Registered')
    }
    setRegisterPopup(true);
    setShowOverlay(true);
  }

const handleOverlayDoubleClick = () => {
  setShowOverlay(false);
};
  return (
    <div>
      {showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup/>
        </div>
  )}
     <header className="header">
        <div className="header-inner">

            <p className="large">Track all your Web Applications in one place.</p>
            <p className="header-para"> Compare, Rate and Review web applications. Keep track of Web Applications you use or planning to use.
                 Get alerts before your payment is processed. Save your time, money or both!</p>
                      <button href="/" className="button-light">Start Building a Website</button>
            <p className="header-para" >A Random selection of Web Applications reviewed <span onClick={()=> handleRegisterPopup()}
            style={{cursor: 'pointer'}}
            >Join us.</span></p>
        </div>
            </header>
           
            <div className="container latest-reviews">
                <div className='product-images'><ProductCard products={products.data}/></div>

                <h2 className="heading-h2">Appsala Reviews Over <span>1,000</span> Web Applications</h2>
                <img src={performance} 
                style={{height: '500px'}}
                alt="" />
                <h2 className="heading-h2">Appsala Reviews Over <span>1,000</span> Web Applications</h2>
                <p className="header-para"
                style={{width: '60%', textAlign: 'center', margin: 'auto'}}
                > Compare, Rate and Review web applications. Keep track of Web Applications you use or planning to use.
                 Get alerts before your payment is processed. Save your time, money or both!</p>
        </div>

        <div className="home-flex container">
          <div>
            <img src={dog} alt="" />
            <div className="reviews-card">
                <TiTick className='tick'/>
              <p>
              <b>Track :</b>Tracking the web application you use need not be tiresome.
               Now you can track all the applications in one place.
              </p>
            </div>
            <img src={ankr} alt="" />
          </div>
          <div>
            <img src={notification} alt="" />
            <div className="reviews-card">
                <TiTick className='tick'/>
              <p>
              <b>Notify :</b>Getting unexpected credit card charges could be a thing of the past.
               Get notification before due date so that you can decide to cancel a subscription if not needed.
              </p>
            </div>
            <img src={woman} alt="" />
          </div>
          <div>
            <img src={pana} alt="" />
            <div className="reviews-card">
                <TiTick className='tick'/>
              <p>
              <b>Review :</b>You might spend countless hours going through application reviews.
               Now do your own reviews which you can share only with your team-mates.
              </p>
            </div>
            <img src={board} alt="" />
          </div>
          <div>
            <img src={notepad} alt="" />
            <div className="reviews-card">
                <TiTick className='tick'/>
              <p>
              <b>Notes :</b>There is a chance you need to look for certain features or do further review later. 
              Keep note of everything by keeping private notes on an application. </p>
            </div>
            <img src={girl} alt="" />
          </div>
        </div>

        <div className="bar">
          <h1>Can't Find a Review You are Looking For?</h1>
          <img src={man} alt="" />
          <div>
            <span>
            <p>
            Our team is willing and ready to do it in a short notice. Just submit the website URL,
             and we will be upto the task in no time!
            </p>
            <button className="button-light" 
            onClick={()=> handleRegisterPopup()}
            style={{height: '30px', width: '120px', padding: '5px'}}
            >Register Now</button>
            </span>
          </div>
        </div>
        <h2 className="heading-h2" style={{textAlign: 'center', marginTop: '-7rem'}}>Appsala Reviews Over <span style={{color: '#C6EFBB'}}>1,000</span> Web Applications</h2>
      <div className="blog-list">
        <div>
          <img src={battery} alt="" />
          <h2>Reveal Blocks with Animations</h2>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Amet minim mollit non deserunt </p>
        </div>
        <div>
          <img src={hands} alt="" />
          <h2>Reveal Blocks with Animations</h2>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Amet minim mollit non deserunt </p>
        </div>
        <div>
          <img src={mask} alt="" />
          <h2>Reveal Blocks with Animations</h2>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Amet minim mollit non deserunt </p>
        </div>
      </div>
      <div className="home-footer">
        <h1>Get Started With <span>Appsala</span></h1>
        <button className="button-light" 
        onClick={()=> handleRegisterPopup()}
            style={{height: '30px', width: '150px', padding: '5px'}}
            >Register for free now</button>
            <div>
            <div><TiTick className='tick'/><p>Start Building a Website</p></div>
            <div><TiTick className='tick'/><p>Start Building a Website</p></div>
            <div><TiTick className='tick' /><p>Start Building a Website</p></div>
            </div>
          <img src={footerBanner} alt="" />
      </div>
    </div>
  )
}

export default Home