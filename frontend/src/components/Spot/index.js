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
          <div className="one-spot" key={spot.id}>
            <div className="title">
              <h1>{spot.name}</h1>
            </div>
            <div className="one-spot-info">
              <p>{spot.avgStarRating} ★</p>
              <p>{spot.numReviews} reviews</p>
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>${spot.price} USD/night</p>
            </div>


            <div className="cardimage">
              <img className="one-spot-image" src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="one-spot-description">

            <p>{spot.description}</p>
            </div>
          </div>
        </div>
        <h1>Reviews</h1>
        <div className="reviews-list">
          {reviewsArr.map((review) => (
            <div className="reviewcard" key={review.id} value={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
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
          <div className="one-spot" key={spot.id}>
            <h1>{spot.name}</h1>
            <div className="one-spot-info">
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>

              <p>${spot.price} USD/night</p>
              <p>{spot.numReviews} reviews</p>
              <p>{spot.avgStarRating} ★</p>

            </div>
            <div className="cardimage">
              <img className="one-spot-image" src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="one-spot-description">

            <p>{spot.description}</p>
            </div>
            <h1>Reviews</h1>
            <div className="reviews-list">
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
                  onClick={async (event) => {
                    event.stopPropagation();
                    await dispatch(spotActions.deleteSpotThunk(spot.id));
                  }}
                >
                  Delete Spot
                </button>
              </Link>
            </div>
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
          <div className="one-spot" key={spot.id}>
            <h1>{spot.name}</h1>
            <div className="one-spot-info">
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>

              <p>${spot.price} USD/night</p>
              <p>{spot.numReviews} reviews</p>
              <p>{spot.avgStarRating} ★</p>

            </div>
            <div className="cardimage">
              <img className="one-spot-image" src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div className="one-spot-description">

            <p>{spot.description}</p>
            </div>
            <div className="rev">
            <h1>Reviews</h1>
              <CreateReviewFormModal spot={spot} />
            </div>
            <div className="reviews-list">
              {reviewsArr.map((review) => (
                <div className="reviewcard" key={review.id} value={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

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
