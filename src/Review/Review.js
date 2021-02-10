import React, {Component} from 'react';
import './Review.css'
import config from '../config'
import Context from '../Context'
import EditReview from '../EditReview/EditReview'

class Review extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            editReviewForm: false
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}api/users/${this.props.reviewData.user_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => this.setState({
                name: responseJson.username
            })
            )
            .catch(error => {
                console.error(error)
            })
    }

    showEditReviewForm = e => {
        this.setState({
            editReviewForm: true
        })
    }

    hideEditReviewForm = e => {
        this.setState({
            editReviewForm: false
        })
    }

    render() {
        const reviewData = this.props.reviewData
        const username = this.state.name
        const date = new Date(reviewData.review_posted).toLocaleDateString('en-US')

        const gameData = this.context.allGamesData.find(game => game.id === reviewData.game_id)

        const userId = this.context.currentUserId
        const userSameAsReviewer = (userId === reviewData.user_id)

        return (
            <li className="review">
                <h4>{gameData.name}, {reviewData.rating} out of 5</h4>
                <p>{reviewData.review}</p>
                <div className="deets-and-edit">
                    <p className="user-deets">{username}, {date}</p>
                    {userSameAsReviewer && !this.state.editReviewForm && <button className="edit-btn" onClick={this.showEditReviewForm}>Edit Review</button>}
                </div>
                {userSameAsReviewer && this.state.editReviewForm && <EditReview gameId={reviewData.game_id} rating={reviewData.rating} review={reviewData.review} editReview={this.props.editReview} hideEditReviewForm={this.hideEditReviewForm}/>}
            </li>
        )
    }
}

export default Review;