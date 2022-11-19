import React, { useState, useEffect } from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import "./CreateReviewFormModal.css";

function CreateReviewForm({ spot, setShowModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  let spotId = spot.spot.id;

  useEffect(() => {
    dispatch(reviewActions.allReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    const createdReview = await dispatch(
      reviewActions.createReviewThunk(newReview, spotId, currentUser)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if (createdReview) {
      setShowModal(false);
    } else {
      return setErrors([
        " You already have a review for this spot!"
      ]);
    }

  };

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h1>Create Review</h1>
      <h2>Review Details</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Review
        <input
          className="inputField"
          type="text"
          placeholder="Review"
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
