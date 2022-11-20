import React, { useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import "./CreateSpotFormModal.css";

function CreateSpotForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(45);
  const [lng, setLng] = useState(45);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setURL] = useState("");
  const [preview, setPreview] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      url,
      preview,
    };
    const createdSpot = await dispatch(spotActions.createSpotThunk(spot))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    if (createdSpot) {
      setShowModal(false);
    } else {
      return setErrors([
        "Oops! Looks like a mistake was made on the form. Please check your details and submit again.",
      ]);
    }
  };

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h1>Begin Your Hosting Journey!</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Address
        <input
          className="inputField"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          className="inputField"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          className="inputField"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          className="inputField"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Name
        <input
          className="inputField"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          className="inputField"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          className="inputField"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Image Url
        <input
          className="inputField"
          type="url"
          placeholder="Image Url"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required
        />
      </label>
      <button className="button" type="submit">
        Create New Spot
      </button>
    </form>
  );
}

export default CreateSpotForm;
