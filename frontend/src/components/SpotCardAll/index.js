import "./SpotCardAll.css";

function SpotCardAll({ spot }) {
  return (
    <div className="allcardsinfo">
      <p>{spot.previewImage}</p>
      <p>
        {spot.city}, {spot.state}
      </p>
      <p>${spot.price} USD/night</p>
      <p>{spot.avgRating}★</p>
    </div>
  );
}

export default SpotCardAll;
