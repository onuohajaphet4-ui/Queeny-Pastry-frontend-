import React from 'react'

const StarRating = ({ value }) => {
  return (
    <div style={{ color: "#f5a623", fontSize: "23px" }}>
      {[1,2,3,4,5].map((star) => (
        <span key={star}>
          {value >= star ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
