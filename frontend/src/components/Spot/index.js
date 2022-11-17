import React from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotFormModal from "../EditSpotForm/index";
import "./spot.css";

function GetOneSpotPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;
  useEffect(() => {
    dispatch(spotActions.spotThunk(spotId));
  }, [dispatch, spotId]);
  const currentSpot = useSelector((state) => state.spots);
  const spotObj = Object.values(currentSpot);
  // console.log(currentSpot)
  // console.log('hi1',spotObj[0].SpotImages[0].url)

  if (!currentSpot) {
    return null;
  }

  return (
    <>
      <div>
        {spotObj.map((spot) => (
          <div className="one-spot" key={spot.id}>
            <div className="cardimage"></div>
            <img src={spot.SpotImages[0].url} alt={""} />
            <h3>{spot.name}</h3>
            <p>{spot.address}</p>
            <p>
              {spot.city}, {spot.state}
            </p>
            <p>${spot.price} USD/night</p>
            <p>{spot.avgStarRating}★</p>
            <p>{spot.description}</p>
            <EditSpotFormModal spot={spot} />
            <button
              onClick={(event) => {
                event.stopPropagation();
                dispatch(spotActions.deleteSpotThunk(spot.id));
              }}
            >
              Delete Spot
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetOneSpotPage;
