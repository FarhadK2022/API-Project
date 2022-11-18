import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser === null || sessionUser === undefined) {

    return (
      <div className="reviewcontainer">
        <div className="reviewinfo">
          <p>{review.review}</p>
          <p>{review.stars}★</p>
          <p>
            {review.User.firstName}, {review.createdAt}
          </p>
        </div>
        <div className="reviewimages">
          <p>{review.ReviewImages[0]?.url}</p>
        </div>

      </div>
    );
  } else if (sessionUser.id === review.User.id){
    return (
      <div className="reviewcontainer">
        <div className="reviewinfo">
          <p>{review.review}</p>
          <p>{review.stars}★</p>
          <p>
            {review.User.firstName}, {review.createdAt}
          </p>
        </div>
        <div className="reviewimages">
          <p>{review.ReviewImages[0]?.url}</p>
        </div>
        <button
          onClick={async (event) => {
            event.stopPropagation();
            await dispatch(reviewActions.deleteReviewThunk(review.id)).then( <Redirect to="/" />);
          }}
        >
          Delete Review
        </button>
      </div>
    );
  } else {
    return (
      <div className="reviewcontainer">
        <div className="reviewinfo">
          <p>{review.review}</p>
          <p>{review.stars}★</p>
          <p>
            {review.User.firstName}, {review.createdAt}
          </p>
        </div>
        <div className="reviewimages">
          <p>{review.ReviewImages[0]?.url}</p>
        </div>

      </div>
    );
  }
}

export default ReviewCard;
