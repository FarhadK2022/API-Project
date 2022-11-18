import { csrfFetch } from "./csrf";

const GET_REVIEWS = "spots/getAllReviews";
const CREATE_REVIEW = "spots/createReview";
const DELETE_REVIEW = "spots/deleteReview";

const getAllReviews = (revs) => {
  return {
    type: GET_REVIEWS,
    revs,
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
    dispatch(getAllReviews(data.Reviews));
  }
  return response;
};

export const createReviewThunk = (newReview, spot) => async (dispatch) => {
  const { review, stars } = newReview;
  const response = await csrfFetch(`/api/spots/${spot}/reviews`, {
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

const initialState = {allReviews:{}};

const reviewReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEWS:{
      const newState = {allReviews:{}};
      action.revs.forEach((rev) => (newState.allReviews[rev.id] = rev));
      return newState;
    }
    case CREATE_REVIEW:{
      const newState = {...state, allReviews:{...state.allReviews}}
      newState.allReviews[action.rev.id] = action.rev;
      return newState;
    }
    case DELETE_REVIEW:{
      const newState = {...state, allReviews:{...state.allReviews}}
      delete newState.allReviews[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
