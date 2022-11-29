import React from "react";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewCard from "../ReviewCard/index";
import EditSpotFormModal from "../EditSpotFormModal/index";
import CreateReviewFormModal from "../CreateReviewFormModal/index";
import "./spot.css";

function GetOneSpotPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(spotActions.spotThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(reviewActions.allReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);

  const reviews = useSelector((state) => state.reviews.allReviews);
  const reviewsArr = Object.values(reviews);

  if (!spot.SpotImages) {
    return null;
  }

  if (sessionUser === null || sessionUser === undefined) {
    return (
      <>
        <div className="one-spot-container">
          <div className="one-spot-info-section" key={spot.id}>
            <div className="one-spot-title">
              <h1>{spot.name}</h1>
            </div>
            <div className="one-spot-info">
              <p>
                ★ {spot.avgStarRating} • {spot.numReviews} reviews • {spot.city},{" "}
                {spot.state}, {spot.country} • ${spot.price} night
              </p>
            </div>
          </div>
          <div className="one-spot-images-section">
            <div className="cardimage-one">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="cardimage-quad">
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
            </div>
          </div>
          <div className="one-spot-description-section">
            <p>{spot.description}</p>
          </div>
          <div className="one-spot-review-title">
            <h2>
              ★ {spot.avgStarRating} • {spot.numReviews} reviews
            </h2>
          </div>
          <div className="reviews-section">
            {reviewsArr.map((review) => (
              <div className="reviewcard" key={review.id} value={review.id}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
        <footer className="footer">
          <p>Developed By Farhad Koushan</p>
        </footer>
      </>
    );
  } else if (sessionUser.id === spot.ownerId) {
    return (
      <>
        <div className="one-spot-container">
          <div className="one-spot-info-section" key={spot.id}>
            <div className="one-spot-title">
              <h1>{spot.name}</h1>
            </div>
            <div className="one-spot-info">
              <p>
                ★ {spot.avgStarRating} • {spot.numReviews} reviews • {spot.city},{" "}
                {spot.state}, {spot.country} • ${spot.price} night
              </p>
            </div>
          </div>
          <div className="one-spot-images-section">
            <div className="cardimage-one">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="cardimage-quad">
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
            </div>
          </div>
          <div className="one-spot-description-section">
            <p>{spot.description}</p>
          </div>
          <div className="one-spot-review-title">
            <h2>
              ★ {spot.avgStarRating} • {spot.numReviews} reviews
            </h2>
          </div>
          <div className="reviews-section">
            {reviewsArr.map((review) => (
              <div className="reviewcard" key={review.id} value={review.id}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
          <div className="owners-tools">
            <EditSpotFormModal spot={spot} />
            <Link to={`/`}>
              <button
                className="button"
                onClick={async () => {
                  // event.stopPropagation();
                  await dispatch(spotActions.deleteSpotThunk(spot.id));
                }}
              >
                Delete Spot
              </button>
            </Link>
          </div>
        </div>
        <footer className="footer">
          <p>Developed By Farhad Koushan</p>
        </footer>
      </>
    );
  } else if (sessionUser.id !== spot.ownerId) {
    return (
      <>
        <div className="one-spot-container">
          <div className="one-spot-info-section" key={spot.id}>
            <div className="one-spot-title">
              <h1>{spot.name}</h1>
            </div>
            <div className="one-spot-info">
              <p>
                ★ {spot.avgStarRating} • {spot.numReviews} reviews • {spot.city},{" "}
                {spot.state}, {spot.country} • ${spot.price} night
              </p>
            </div>
          </div>
          <div className="one-spot-images-section">
            <div className="cardimage-one">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="cardimage-quad">
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
              <i class="fa-solid fa-image fa-9x"></i>
            </div>
          </div>
          <div className="one-spot-description-section">
            <p>{spot.description}</p>
          </div>
          <div className="one-spot-review-title">
            <h2>
              ★ {spot.avgStarRating} • {spot.numReviews} reviews
            </h2>
            <CreateReviewFormModal spot={spot} />
          </div>
          <div className="reviews-section">
            {reviewsArr.map((review) => (
              <div className="reviewcard" key={review.id} value={review.id}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
        <footer className="footer">
          <p>Developed By Farhad Koushan</p>
        </footer>
      </>
    );
  }
}

export default GetOneSpotPage;
