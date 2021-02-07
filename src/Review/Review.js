import React, {Component} from 'react';
import './Review.css'
import config from '../config'
import Context from '../Context'

class Review extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            name: ""
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

    render() {
        const reviewData = this.props.reviewData
        const username = this.state.name
        const date = new Date(reviewData.review_posted).toLocaleDateString('en-US')

        const gameData = this.context.allGamesData.find(game => game.id === reviewData.game_id)

        return (
            <li>
                <p>{gameData.name}, {reviewData.rating} out of 5</p>
                <p>{reviewData.review}</p>
                <p>{username}, {date}</p>
            </li>
        )
    }
}

export default Review;