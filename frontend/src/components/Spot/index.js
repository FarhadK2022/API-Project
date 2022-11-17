import React from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotFormModal from "../EditSpotFormModal/index";
import "./spot.css";

function GetOneSpotPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let { spotId } = useParams();

  useEffect(() => {
    dispatch(spotActions.spotThunk(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots.singleSpot);
  if (!spot.SpotImages) {
    return null;
  }
  if (sessionUser === null || sessionUser.id !== spot.ownerId){
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
              <p>${spot.price} USD/night</p>
              <p>{spot.avgStarRating}★</p>
              <p>{spot.description}</p>
            </div>
            <div>
              <EditSpotFormModal spot={spot} />
            </div>
          </div>
        </div>
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
              <p>${spot.price} USD/night</p>
              <p>{spot.avgStarRating}★</p>
              <p>{spot.description}</p>
            </div>
            <div>
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
          </div>
        </div>
      </>
    );
  }
}

export default GetOneSpotPage;
