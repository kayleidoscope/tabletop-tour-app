import React, {Component} from 'react';
import './AddReview.css'
import Context from '../Context'
import config from '../config'

class AddReview extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            rating: null,
            review: ""
        }
    }

    addLocalGameData() {
        const newGameEntry = this.props.gameData

        return fetch(`${config.API_ENDPOINT}api/games`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newGameEntry)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.gameAdded(responseJson)
                return
            })
            .catch(error => {
                console.error(error)
            })
    }

    postNewReview = (newReview) => {
        fetch(`${config.API_ENDPOINT}api/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newReview)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                if (this.context.currentUserId) this.context.updateUsersReviews(responseJson)
                this.props.addReview(responseJson)
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleSubmit = async(e) => {
        e.preventDefault()
        const localGameData = this.context.allGamesData.find(game => game.id === this.props.gameId)

        if(!localGameData) {
            await this.addLocalGameData()
        }

        const rating = parseInt(this.state.rating)
        const review = this.state.review
        const user_id = this.context.currentUserId ? this.context.currentUserId : 30
        const game_id = this.props.gameId

        const newReview = {user_id, game_id, review, rating}

        await this.postNewReview(newReview)

    }
    
    reviewChanged = review => {
        this.setState({
            review
        })
    }

    ratingChanged = rating => {
        this.setState({
            rating: rating.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Review {this.props.gameName}</h3>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend htmlFor="rating">Rating out of 5: </legend>
                        <input 
                            type="radio" 
                            id="1" 
                            name="rating" 
                            value={1}
                            required
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="1">1</label>
                        <input 
                            type="radio" 
                            id="2" 
                            name="rating" 
                            value={2}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="2">2</label>
                        <input 
                            type="radio" 
                            id="3" 
                            name="rating" 
                            value={3}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="3">3</label>
                        <input 
                            type="radio" 
                            id="4" 
                            name="rating" 
                            value={4}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="4">4</label>
                        <input 
                            type="radio" 
                            id="5" 
                            name="rating" 
                            value={5}
                            onChange={this.ratingChanged}
                        />
                        <label htmlFor="5">5</label>
                    </fieldset>
                    <br />
                    <label htmlFor="text">Review text: </label>
                    <textarea name="text" id="text" required  onChange = {e => this.reviewChanged(e.target.value)}/>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddReview;