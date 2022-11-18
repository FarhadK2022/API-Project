import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

import { useDispatch } from "react-redux";
import "./CreateReviewFormModal.css";


function CreateReviewForm({ spot, setShowModal }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  let spotId = spot.spot.id
  useEffect(() => {
    dispatch(reviewActions.allReviewsThunk(spotId));
  });
  const handleSubmit = async (e) => {
    e.preventDefault();


    const newReview = {
      review,
      stars,
    };

    dispatch(reviewActions.createReviewThunk(newReview, spotId))
  }

  // if (createdReview) {
  //   setShowModal(false);
  //   <Redirect to="/" />
  // }

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h1>Create Review</h1>
      <h2>Review Details</h2>

      <label>
        Review
        <input
          className="inputField"
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <label>
        Stars
        <select
          className="inputField"
          type="text"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        >
          <option value={0}>----</option>
          <option value={5}>★★★★★</option>
          <option value={4}>★★★★</option>
          <option value={3}>★★★</option>
          <option value={2}>★★</option>
          <option value={1}>★</option>
        </select>
      </label>
      <button className="button" type="submit">
        Create New Review
      </button>
    </form>
  );
}

export default CreateReviewForm;
