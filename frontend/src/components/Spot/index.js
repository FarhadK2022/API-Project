import React from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotCardOne from "../SpotCardOne";
import "./spot.css";

function GetOneSpotPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;
  const currentSpot = useSelector((state) => state.spots);
  const spotObj = Object.values(currentSpot);

  useEffect(() => {
    dispatch(spotActions.spotThunk(spotId));
  }, [dispatch, spotId]);

  if (!currentSpot) {
    return null;
  }

  return (
    <>
      <div>
        {spotObj.map((spot) => (
          <div className="card" key={spot.id}>
            <SpotCardOne spot={spot} />
          </div>
        ))}
      </div>
    </>
  );
}

export default GetOneSpotPage;
