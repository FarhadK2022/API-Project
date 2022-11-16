import React from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./spots.css";

function GetAllSpotsPage() {
  const dispatch = useDispatch();
  const currentSpots = useSelector((state) => state.spots);
  const spotsObj = Object.values(currentSpots);

  useEffect(() => {
    dispatch(spotsActions.allSpotsThunk());
  }, [dispatch]);

  if (!currentSpots) {
    return null;
  }

  return (
    <>
      <h2>Where to Next?</h2>
      <div className="spots-list">
        {spotsObj.map((spot) => (
          <button className="card" key={spot.id}>
          <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
            <div className="container">
              <p>{spot.previewImage}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>${spot.price} USD/night</p>
              <p>{spot.avgRating}★</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default GetAllSpotsPage;
