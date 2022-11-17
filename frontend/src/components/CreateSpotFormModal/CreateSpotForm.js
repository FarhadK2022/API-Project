import React, { useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";


function CreateSpotForm({setShowModal}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setURL] = useState("");
  const [preview, setPreview] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      preview
    };
     const createdSpot = await dispatch(spotActions.createSpotThunk(spot));
      if (createdSpot) setShowModal(false)
    };


  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h1>Create New Spot!</h1>
      <h2>Spot Details</h2>
      <label>
        Address
        <input
          className="inputField"
          type="text"
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
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude
        <input
          className="inputField"
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        Longitude
        <input
          className="inputField"
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label>
        Name
        <input
          className="inputField"
          type="text"
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          className="inputField"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL
        <input
          className="inputField"
          type="text"
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
