import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getAllSpots";
const GET_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";

const getAllSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

export const allSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSpots(data.Spots));
  }
  return response;
};

export const spotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpot(data));
  }
  return response;
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    url,
    preview,
  } = spot;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const newSpot = await response.json();
    const response2 = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
      method: "POST",
      body: JSON.stringify({
        url,
        preview,
      }),
    });
    if (response2.ok) {
      const newImage = await response2.json();
      newSpot.previewImage = newImage.url;
      dispatch(createSpot(newSpot));
    }
    return newSpot;
  }
};

export const editSpotThunk = (spotId, spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    spot;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data));
    return data;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
  return response;
};

const initialState = {allSpots:{}, singleSpot:{}};

const spotReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS: {
      const newState = {allSpots:{}, singleSpot:{}};
      action.spots.forEach((spot) => (newState.allSpots[spot.id] = spot));
      return newState;
    }
    case GET_SPOT: {
      const newState = {allSpots:{}, singleSpot:{}}
      newState.singleSpot = action.spot;
      return newState;
    }
    case CREATE_SPOT: {
        const newState = {...state, allSpots:{...state.allSpots}, singleSpot:{}}
        newState.allSpots[action.spot.id] = action.spot;
        return newState;
      }
    case EDIT_SPOT:{
      const newState = {...state, allSpots:{}, singleSpot:{...state.singleSpot}}
      newState.singleSpot = {...newState.singleSpot, ...action.spot};
      return newState;
    }
    case DELETE_SPOT:{
      const newState = {...state, allSpots:{...state.allSpots}, singleSpot:{}}
      delete newState.allSpots[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
