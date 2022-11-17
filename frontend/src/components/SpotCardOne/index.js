import { useDispatch } from "react-redux";
// import { NavLink, Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
import EditSpotFormModal from "../EditSpotForm/index";
import "./SpotCardOne.css";

 function SpotCardOne({ spot }) {
  console.log('hi',spot)
  const dispatch = useDispatch();
  // const {SpotImages} = spot
  // let index = 0;
  // const obj = SpotImages.at(index)
  // console.log(SpotImages)
  // console.log(obj)
  // console.log(obj.url)

  return (
    <div>
      <div className="cardimage">
          <img src={spot.previewImage} alt="" />
      </div>
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
