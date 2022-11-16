import React from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"

import "./spot.css";

function GetOneSpotPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const {spotId} = params
  const currentSpot = useSelector((state) => state.spots);
  const spotObj = Object.values(currentSpot);

  useEffect(() => {
    dispatch(spotsActions.spotThunk(spotId));
  }, [dispatch]);

  if (!currentSpot) {
    return null;
  }

  return (
    <>
      <div>
        {spotObj.map((spot) => (
          <button className="card" key={spot.id}>
           
              <p>{spot.previewImage}</p>
              <h3>{spot.name}</h3>
              <p>{spot.address}</p>
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>${spot.price} USD/night</p>
              <p>{spot.avgStarRating}★</p>
              <p>{spot.description}</p>
            {/* </Link> */}
          </button>
        ))}
      </div>
    </>
  );
}

export default GetOneSpotPage;
