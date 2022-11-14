import React, { useDebugValue, useState } from "react";
import * as spotsActions from "../../store/spots";
import { allSpotsThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./spots.css"

function GetAllSpotsPage() {
  const dispatch = useDispatch()
  const currentSpots = useSelector((state) => state.spots)
  const spotsObj = Object.values(currentSpots)

  useEffect(() => {
    dispatch(spotsActions.allSpotsThunk())
  }, [dispatch])

  if (!currentSpots){
    return null;
  }

    return (
      <>
      <h1>Spots</h1>
      <ul className="spots-list">
      

        {spotsObj.map((spot) =>
        <li className="card" key={spot.id}>
          {spot.name}
          {spot.adress}
          {spot.city}
          {spot.state}
          {spot.country}
          {spot.price}
          {spot.avgRating}
          {spot.previewImage}
        </li>
        )}


      </ul>
      </>
    )

  }


export default GetAllSpotsPage;
