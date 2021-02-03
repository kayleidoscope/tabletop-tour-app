import React, {Component} from 'react';
import './Review.css'

class Review extends Component {

    render() {
        const reviewData = this.props.reviewData
        const username = reviewData.username ? reviewData.username : "unknown user"

        return (
            <li>
                <p>{reviewData.rating} out of 5</p>
                <p>{reviewData.text}</p>
                <p>{username}, {reviewData.date_created}</p>
            </li>
        )
    }
}

export default Review;