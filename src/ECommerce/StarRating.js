import React from 'react';

const StarRating = ({ rating }) => {
    const stars = [];
    // Round the rating to the nearest half star
    const roundedRating = Math.round(rating * 2) / 2;
    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) {
            stars.push(<i key={i} className="fa fa-star text-warning"></i>);
        } else {
            stars.push(<i key={i} className="fa fa-star-o text-secondary"></i>);
        }
    }
    return (
        <div>
            {stars}
        </div>
    );
}

export default StarRating;
