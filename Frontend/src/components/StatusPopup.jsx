import React, { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import moment from 'moment';
// import DatePicker from "react-date-picker";
import { DatePicker } from 'antd'
function StatusPopup({setShowOverlay, setStatusPopup, info}) {
  const [form, setForm] = useState({
    date: null,
    package: 'Professional',
    amount: '',
    duration:  'Monthly',
  })
  const [dateValue, setDateValue] = useState()
  const handleInputChange = (e) => {
   const name = e.target.name
    const value = e.target.value
    // const { name, value } = e.target;
    setForm((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};
const handleDateChange = (date, dateString) => {
  setForm((prevData) => ({
    ...prevData,
    date: dateString, // Update the date in the form with the formatted date string
  }));
};

const handleSubmit = async(e) => {
  e.preventDefault()
  const applicationId = info.obj_id._id
  const authToken = localStorage.getItem('access_token')
  const api = `https://appsalabackend-p20y.onrender.com/updatePricingInfoInUserSchema/${applicationId}`
  const requestOptions = {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  };
  console.log(requestOptions)
  try {
    const response = await fetch(api, requestOptions);
    const data = await response.json();
    // setSelectedRatings(currentRatings)
    console.log('Response data:', data);
    // Handle the response data here
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
  }

}
  const handleClick = () => {
    setShowOverlay(false);
    setStatusPopup(false);
  }
  // const [dateValue, onDateChange] = useState(new Date());
  return (
    <div className="status-popup">
    <div className="status-heading">
    <h3>Subscription Details</h3>  
    <p>Fill up the Details of the App/Service you are using.</p>
    </div>
    <div class="line"></div>
    <form action="" className="subscription-form" onSubmit={handleSubmit} >
        <div  className="subscription-form-child">
        <label htmlFor="">Start Date</label>
        <div className="date-picker-container">
          <DatePicker   onChange={handleDateChange} // Handle date change and format it as needed
              value={form.date ? moment(form.date, 'DD-MM-YYYY') : null} // Convert form.date to moment object
              format="DD-MM-YYYY"  />
          <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        </div>
        <div className="subscription-form-child">
        <label htmlFor="">Package</label>
        <div className="select-container">
        <select class="custom-select" value={form.package}
        name="package"
        onChange={handleInputChange}>
          <option value="Professional">Professional</option>
          <option value="Free">Free</option>
        </select>
        <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        </div>
        <div className="subscription-form-child">
        <div>
        <label htmlFor="">Price 💵</label>
        <input type="text"  placeholder="12" className="price" 
        value={form.amount}
        name="amount"
        onChange={handleInputChange}/>
        </div>
       
        <div className="select-container">
        <select class="custom-select" value={form.duration} name='duration' onChange={handleInputChange}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        <div className="checkbox-container">
        <label htmlFor="" className="notify">Notify me</label>
        <input type="checkbox"  className="checkbox"/>
        </div>
        </div>
    </form>

    <div className="rating-buttons status-bottons">
    <button className="button"  onClick={handleClick}>Cancel</button>
    <button className="button-light" onClick={handleSubmit} >Submit</button>
    </div>
    </div>
  )
}

export default StatusPopup