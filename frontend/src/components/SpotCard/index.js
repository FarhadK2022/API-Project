import "./SpotCardAll.css";

function SpotCardAll({ spot }) {
  return (
    <>
      <div className="card-container">
        <div className="card">
          <img src={spot.previewImage} alt={""} />
          <div className="card-info">
            <h2>{spot.city}, {spot.state}</h2>
            <h3>★ {spot.avgRating}</h3>
            </div>
            <div className="card-price">
           <h2>${spot.price} night</h2>
          </div>
       </div>
      </div>

    </>
  );
}

export default SpotCardAll;
