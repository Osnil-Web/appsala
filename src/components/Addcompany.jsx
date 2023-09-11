import React, { useState, useEffect } from "react";
import "./Addcompany.css"; // Add this CSS file for styling
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Review.css';




const Addcompany = () => {

  const [formData, setFormData] = useState({
    name: "",
    shortname: "",
    slug: "",
    rating: {

    },
    logo: null,
    tag: [],
    Category: "",
    shortDescription: "",
    longDescription: "",
    review: "",
    sellerDetails: {
      seller: "",
      Website: "",
      companyWebsite: "",
      yearFounded: "",
      HQLocation: "",
      socialmedia: {
        twitter: "",
        linkedInPage: "",
      },
    },
    appPricing: [],
    appMedia: {
      officialScreenshots: [],
      officialVideos: [],
      officialDownloads: [],
    },
  });

  const [appPricing, setAppPricing] = useState([
    {
      appName: '',
      price: 0,
      description: '',
    },
  ]);

  const handleAppPricingChange = (event, index) => {
    const { name, value } = event.target;
    const updatedAppPricing = appPricing.map((pricing, i) => {
      if (i === index) {
        return {
          ...pricing,
          [name]: value,
        };
      }
      return pricing;
    });

    // Update both the appPricing state and the formData state
    setAppPricing(updatedAppPricing);
    setFormData((prevFormData) => ({
      ...prevFormData,
      appPricing: updatedAppPricing,
    }));
  };


  const [appMedia, setAppMedia] = useState({
    officialScreenshots: [],
    officialVideos: [],
    officialDownloads: [],
  });

  const handleAddAppPricing = () => {
    setAppPricing([
      ...appPricing,
      {
        appName: '',
        price: 0,
        description: '',
      },
    ]);
  };



  const handleAppMediaChange = (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAppMedia({
        ...appMedia,
        [field]: [...appMedia[field], reader.result],
      });
    };
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "twitter") {
      // Update the Twitter field in socialmedia
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerDetails: {
          ...prevFormData.sellerDetails,
          socialmedia: {
            ...prevFormData.sellerDetails.socialmedia,
            twitter: value,
          },
        },
      }));
    } else if (name === "linkedInPage") {
      // Update the LinkedIn Page field in socialmedia
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerDetails: {
          ...prevFormData.sellerDetails,
          socialmedia: {
            ...prevFormData.sellerDetails.socialmedia,
            linkedInPage: value,
          },
        },
      }));
    } else if (name.includes(".")) {
      const [outerName, innerName] = name.split(".");
      // Update other fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [outerName]: {
          ...prevFormData[outerName],
          [innerName]: value,
        },
      }));
    } else if (name === "tag") {
      const tagsArray = value.split(", ");
      setFormData((prevFormData) => ({
        ...prevFormData,
        tag: tagsArray,
      }));
    } else {
      if (name === "sellerDetails.yearFounded" && value !== "") {
        const numericValue = parseInt(value);
        if (!Number.isNaN(numericValue) && numericValue >= 1000 && numericValue <= 9999) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }
  };

  const handleRemoveAppPricing = (index) => {
    const updatedAppPricing = [...appPricing];
    updatedAppPricing.splice(index, 1); // Remove the pricing entry at the specified index

    // Update both the appPricing state and the formData state
    setAppPricing(updatedAppPricing);
    setFormData((prevFormData) => ({
      ...prevFormData,
      appPricing: updatedAppPricing,
    }));
  };




  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    // Check if the value is a valid number between 0 and 5
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        rating: {
          ...prevFormData.rating,
          [name]: numericValue,
        },
      }));
    } else {
      // If the value is invalid, set the rating field to null
      setFormData((prevFormData) => ({
        ...prevFormData,
        rating: {
          ...prevFormData.rating,
          [name]: null,
        },
      }));
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: file,
    }));
  };

  // State to store the list of categories fetched from the API
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("https://appsalabackend-p20y.onrender.com/subcategory")
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains a "data" property that is an array
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error("Invalid API response format - categories not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  // ...

  const handleSubmit = async (e) => {
    

    try {
      const formDataToUpload = new FormData();

      formDataToUpload.append("name", formData.name);
      formDataToUpload.append("shortname", formData.shortname);
      formDataToUpload.append("slug", formData.slug);
      formDataToUpload.append("logo", formData.logo);
      formDataToUpload.append("tag", formData.tag.join(", "));
      formDataToUpload.append("Category", formData.Category);
      formDataToUpload.append("shortDescription", formData.shortDescription);
      formDataToUpload.append("longDescription", formData.longDescription);
      formDataToUpload.append("review", formData.review);

      // Append sellerDetails as a JSON string
      formDataToUpload.append("sellerDetails", JSON.stringify(formData.sellerDetails));

      // Append appPricing as a JSON string
      formDataToUpload.append("appPricing", JSON.stringify(appPricing));

      // Append appMedia as a JSON string
      formDataToUpload.append("appMedia", JSON.stringify(appMedia));



      // Post the form data to https://localhost:5000/create_products using fetch
      const response = await fetch("https://appsalabackend-p20y.onrender.com/create_products", {
        method: "POST",
        body: formDataToUpload,
      });

      // Check if the response was successful before clearing the form
      if (response.status === true) {
        alert("Data saved successfully",);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };


  const [richText, setRichText] = useState('');

  const handleTextChange = (content) => {
    setRichText(content);
    // Update the review content in the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      review: richText,
    }))
  };





  const TextEditorModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const TextEditorFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];


  return (
    <div className="app-form-container">
      <h1>Create New Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="slug">slug:</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />

        <label htmlFor="shortname">Short Name:</label>
        <input
          type="text"
          id="shortname"
          name="shortname"
          value={formData.shortname}
          onChange={handleChange}
          required
        />

        <h2>Rating:</h2>
        <label htmlFor="Usability">Usability:</label>
        <input
          type="number"
          id="Usability"
          name="rating.Usability"
          value={formData.rating.Usability}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="Perfomance">Performance:</label>
        <input
          type="number"
          id="Perfomance"
          name="rating.Perfomance"
          value={formData.rating.Perfomance}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="Features">Features:</label>
        <input
          type="number"
          id="Features"
          name="rating.Features"
          value={formData.rating.Features}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="Support">Support:</label>
        <input
          type="number"
          id="Support"
          name="rating.Support"
          value={formData.rating.Support}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="Value">Value:</label>
        <input
          type="number"
          id="Value"
          name="rating.Value"
          value={formData.rating.Value}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="company">Company:</label>
        <input
          type="number"
          id="company"
          name="rating.company"
          value={formData.rating.company}
          onChange={handleRatingChange}
          min={0}
          max={5}
        />

        <label htmlFor="logo">Logo:</label>
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleImageChange}
        />

        <label htmlFor="tag">Tags</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag.join(", ")}
          onChange={handleChange}
        />

        <label htmlFor="Category">Category:</label>
        <select
          id="Category"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="shortDescription">Short Description:</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          style={{ width: "500px", height: '200px', marginBottom: '100px' }}
          required
        />

        <label htmlFor="longDescription">Long Description:</label>
        <textarea
          id="longDescription"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          style={{ width: "500px", height: '300px', marginBottom: '100px' }}
          required
        />

        <label htmlFor="review">Review:</label>
        <h1>Review :</h1>
        <div>
          <ReactQuill
            value={richText}
            onChange={handleTextChange}
            placeholder="Enter your text here..."
            modules={TextEditorModules}
            formats={TextEditorFormats}
            style={{ height: '300px', marginBottom: '100px' }}
          />
        </div>



        <label htmlFor="seller">Seller:</label>
        <input
          type="text"
          id="seller"
          name="sellerDetails.seller"
          value={formData.sellerDetails.seller}
          onChange={handleChange}
          required
        />

        <label htmlFor="Website">Website:</label>
        <input
          type="text"
          id="Website"
          name="sellerDetails.Website"
          value={formData.sellerDetails.Website}
          onChange={handleChange}
          required
        />

        <label htmlFor="companyWebsite">Company Website:</label>
        <input
          type="text"
          id="companyWebsite"
          name="sellerDetails.companyWebsite"
          value={formData.sellerDetails.companyWebsite}
          onChange={handleChange}
          required
        />

        <label htmlFor="yearFounded">Year Founded:</label>
        <input
          type="number"

          id="yearFounded"
          name="sellerDetails.yearFounded"
          value={formData.sellerDetails.yearFounded}
          onChange={handleChange}
          required
          min="1900" max="2050"
        />

        <label htmlFor="HQLocation">HQ Location:</label>
        <input
          type="text"
          id="HQLocation"
          name="sellerDetails.HQLocation"
          value={formData.sellerDetails.HQLocation}
          onChange={handleChange}
          required
        />

        <label htmlFor="twitter">Twitter:</label>
        <input
          type="text"
          id="twitter"
          name="twitter"  // Use "twitter" as the name, not "sellerDetails.socialmedia.twitter"
          value={formData.sellerDetails.socialmedia.twitter}
          onChange={handleChange}
        />

        <label htmlFor="linkedInPage">LinkedIn Page:</label>
        <input
          type="text"
          id="linkedInPage"
          name="linkedInPage" // Use "linkedInPage" as the name, not "sellerDetails.socialmedia.linkedInPage"
          value={formData.sellerDetails.socialmedia.linkedInPage}
          onChange={handleChange}
        />


        {appPricing.map((pricing, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="App Name"
              name="appName"
              value={pricing.appName}
              onChange={(e) => handleAppPricingChange(e, index)}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={pricing.price}
              onChange={(e) => handleAppPricingChange(e, index)}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={pricing.description}
              onChange={(e) => handleAppPricingChange(e, index)}
            />
            <button onClick={() => handleRemoveAppPricing(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddAppPricing}>
          Add Pricing
        </button>


        {/* App Media Fields
     <label>Screenshots</label>
      <input
        type="file"
        name="officialScreenshots"
        placeholder="Screenshots"
        multiple
        onChange={(e) => handleAppMediaChange(e, 'officialScreenshots')}
      />
      <label>officialVideos</label>
      <input
        type="file"
        name="officialVideos"
        placeholder="officialVideos"
        multiple
        onChange={(e) => handleAppMediaChange(e, 'officialVideos')}
      />
      <label>officialDownloads</label>
      <input
        type="file"
        name="officialDownloads"
        placeholder="officialDownloads"
        multiple
        onChange={(e) => handleAppMediaChange(e, 'officialDownloads')}
      />  */}



        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Addcompany;
