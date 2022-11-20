import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser === null || sessionUser === undefined) {
    return (
      <div className="reviewcard">
        <div className="reviewinfo">
          <i className="fas fa-user-circle" />
          <p>{review.User.firstName}, {review.createdAt}</p>
          <p>{review.review}</p>
          <p>{review.stars}★</p>
        </div>
      </div>
    );
  } else if (sessionUser.id === review.User.id) {
    return (
      <div className="reviewcard">
        <div className="reviewinfo">
          <i className="fas fa-user-circle" />
          <p>{review.User.firstName}, {review.createdAt}</p>
          <p>{review.review}</p>
          <p>{review.stars}★</p>
        </div>
          <button className="button"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(reviewActions.deleteReviewThunk(review.id));
            }
            }>
            Delete Review
          </button>
      </div>
    );
  } else {
    return (
      <div className="reviewcard">
        <div className="reviewinfo">
          <i className="fas fa-user-circle" />
          <p>{review.User.firstName}, {review.createdAt}</p>
          <p>{review.review}</p>
          <p>{review.stars}★</p>
        </div>

      </div>
    );
  }
}

export default ReviewCard;
