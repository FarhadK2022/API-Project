import { csrfFetch } from "./csrf";

const GET_REVIEWS = "spots/getAllReviews";
const CREATE_REVIEW = "spots/createReview";
const DELETE_REVIEW = "spots/deleteReview";

const getAllReviews = (rev) => {
  return {
    type: GET_REVIEWS,
    rev,
  };
};

const createReview = (rev) => {
  return {
    type: CREATE_REVIEW,
    rev,
  };
};

const deleteReview = () => {
  return {
    type: DELETE_REVIEW,
  };
};

export const allReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllReviews(data));
  }
  return response;
};

export const createReviewThunk = (newReview, spotId) => async (dispatch) => {
  const { review, stars } = newReview;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
  }
  return response;
};

export const deleteSpotThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview());
  }
  return response;
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEWS:
      action.revs.forEach((rev) => (newState[rev.id] = rev));
      return newState;
    case CREATE_REVIEW:
      newState[action.rev.id] = action.rev;
      return newState;
    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      newState.rev = null;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
