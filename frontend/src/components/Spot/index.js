import React, { useState } from "react";
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
        <div>
          <div className="one-spot" key={spot.id}>
            <h2>{spot.name}</h2>
            <div className="cardimage">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div>
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>{spot.description}</p>
              <p>${spot.price} USD/night</p>
              <p>Number of Reviews:{spot.numReviews}</p>
              <p>{spot.avgStarRating}★</p>
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
  } else if (sessionUser.id === spot.ownerId) {
    return (
      <>
        <div>
          <div className="one-spot" key={spot.id}>
            <h2>{spot.name}</h2>
            <div className="cardimage">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div>
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>{spot.description}</p>
              <p>${spot.price} USD/night</p>
              <p>Number of Reviews:{spot.numReviews}</p>
              <p>{spot.avgStarRating}★</p>
            </div>
            <div className="reviews-list">
              {reviewsArr.map((review) => (
                <div className="reviewcard" key={review.id} value={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            <div>
              <EditSpotFormModal spot={spot} />
              <Link to={`/`}>
              <button className="button"
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
        <div>
          <div className="one-spot" key={spot.id}>
            <h2>{spot.name}</h2>
            <div className="cardimage">
              <img src={spot.SpotImages[0]?.url} alt={""} />
            </div>
            <div>
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>{spot.description}</p>
              <p>${spot.price} USD/night</p>
              <p>Number of Reviews:{spot.numReviews}</p>
              <p>{spot.avgStarRating}★</p>
            </div>
            <div className="reviews-list">
              {reviewsArr.map((review) => (
                <div className="reviewcard" key={review.id} value={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            <div>
              <CreateReviewFormModal spot={spot} />
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
