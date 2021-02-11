import React, {Component} from 'react';
import './EditReview.css'
import Context from '../Context'
import config from '../config'

class EditReview extends Component {
    static contextType = Context

    //grab rating and review from props, where it will be passed down so the user will know what they're changing
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating,
            review: this.props.review
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        //make sure rating comes in as a number, not a string
        const rating = parseInt(this.state.rating)
        const review = this.state.review
        const user_id = this.context.currentUserId
        const game_id = this.props.gameId
        //make sure the review_posted value is in the correct time notation
        const review_posted = new Date(Date.now()).toISOString()

        const editedReview = {user_id, game_id, review, rating, review_posted}

        fetch(`${config.API_ENDPOINT}api/reviews/${user_id}/${game_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(editedReview)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
            })
            .then(noData => {
                //update the user's review
                this.context.updateUsersReviews(editedReview)
                //add the edited review back to the page
                this.props.editReview(editedReview)
            })
            .catch(error => {
                console.error(error)
            })
        //after the fetch is done, make the edit form go away again
        this.props.hideEditReviewForm()
    }
    
    reviewChanged = review => {
        this.setState({
            review
        })
    }

    ratingChanged = rating => {
        const ratingValue = parseInt(rating.target.value)
        this.setState({
            rating: ratingValue
        })
    }

    render() {
        return (
            <div className="edit-review-form">
                <h5>Edit Review {this.props.gameName}</h5>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend htmlFor="rating">Rating out of 5: </legend>
                        <input 
                            type="radio" 
                            id="1" 
                            name="rating" 
                            value={1}
                            checked={this.state.rating === 1 ? true : false}
                            required
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="1">1</label>
                        <input 
                            type="radio" 
                            id="2" 
                            name="rating" 
                            checked={this.state.rating === 2 ? true : false}
                            value={2}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="2">2</label>
                        <input 
                            type="radio" 
                            id="3" 
                            name="rating" 
                            value={3}
                            checked={this.state.rating === 3 ? true : false}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="3">3</label>
                        <input 
                            type="radio" 
                            id="4" 
                            name="rating" 
                            value={4}
                            checked={this.state.rating === 4 ? true : false}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="4">4</label>
                        <input 
                            type="radio" 
                            id="5" 
                            name="rating" 
                            value={5}
                            checked={this.state.rating === 5 ? true : false}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="5">5</label>
                    </fieldset>
                    <label htmlFor="text">Review text: </label>
                    <textarea name="text" id="text" value={this.state.review} required  onChange = {e => this.reviewChanged(e.target.value)}/>
                    <div className="buttons">
                        <input type="submit" value="Submit" />
                        <button onClick={this.props.hideEditReviewForm}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditReview;