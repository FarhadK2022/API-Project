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

const getSpot = (spotId) => {
  return {
    type: GET_SPOT,
    spotId,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const editSpot = (spotId) => {
  return {
    type: EDIT_SPOT,
    spotId,
  };
};

const deleteSpot = () => {
  return {
    type: DELETE_SPOT,
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

export const spotThunk = (spot) => async (dispatch) => {
  const {spotId} = spot.id
  const response = await csrfFetch("/api/spots/:spotId", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpot(data.Spot));
  }
  return response;
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address, city, state, country, lat, lng, name, description, price
    })
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createSpot(data.Spot));
  }
  return response;
};

export const editSpotThunk = (spot) => async (dispatch) => {
  const {spotId} = spot.id
  const { address, city, state, country, lat, lng, name, description, price } = spot
  const response = await csrfFetch("/api/spots/:spotId", {
    method: "PUT",
    body: JSON.stringify({
      address, city, state, country, lat, lng, name, description, price
    })
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data.Spot));
  }
  return response;
};

export const deleteSpotThunk = (spot) => async (dispatch) => {
  const {spotId} = spot.id
  const response = await csrfFetch("/api/spots/:spotId", {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot());
  }
  return response;
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS:
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    case GET_SPOT:
      action.spot.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    case CREATE_SPOT:
      action.spot.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    case EDIT_SPOT:
      action.spot.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    case DELETE_SPOT:
      newState = Object.assign({}, state);
      newState.spot = null;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
