import React, { useDebugValue, useState } from "react";
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
      <h2>Choose Your Adventure</h2>
      <div className="spots-list">
        {spotsObj.map((spot) => (
          <button className="card" key={spot.id}>
            <image>{spot.previewImage}</image>
            <h3>{spot.name}</h3>
            <p>{spot.adress}</p>
            <p>{spot.city}</p>
            <p>{spot.state}</p>
            <p>{spot.country}</p>
            <p>{spot.price} per night</p>
            <p>{spot.avgRating}</p>
            <p>{spot.previewImage}</p>
          </button>
        ))}
      </div>
    </>
  );
}

export default GetAllSpotsPage;

{/* <Link key={spot.id} to={`/locations/${spot.id}`}></Link> */}
