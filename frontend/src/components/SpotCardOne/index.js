import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
import EditSpotFormModal from "../EditSpotForm/index";
import "./SpotCardOne.css";

 function SpotCardOne({ spot }) {
  const dispatch = useDispatch();
  return (
    <div>
      <p>{spot.previewImage}</p>
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
        }}>
        Delete Spot
      </button>
      {/* <Redirect to="/"/> */}
    </div>
  );
}

export default SpotCardOne
