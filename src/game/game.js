import React, {Component} from 'react';
import './Game.css'
import config from '../config'
import dummyData from '../dummyData'
import Review from '../Review/Review'
import AddReview from '../AddReview/AddReview'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameData: {}
        }
    }

    componentDidMount() {
        const gameId = this.props.match.params.id

        fetch(`${config.BGA_BASE_URL}/search?ids=${gameId}&client_id=${config.BGA_CLIENT_ID}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => this.setState({gameData: responseJson.games[0]}))
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const gameData = this.state.gameData

        if (Object.keys(gameData).length === 0) {
            return null
        }

        const reviews = dummyData[0].reviews

        const reviewComponents = reviews.map(review => {
            return (
                <Review reviewData={review} key={review.id} />
            )
        })

        return (
            <section>
                <h2>{gameData.name}</h2>
                <form>
                    <input type="checkbox" id="own" name="own" />
                    <label for="own">I've played this</label>
                    <br />
                    <input type="checkbox" id="love" name="love" />
                    <label for="love">I love this</label>
                    <br />
                    <input type="checkbox" id="want" name="want" />
                    <label for="want">I want to play this</label>
                </form>
                <img src={gameData.images.medium} alt={`${gameData.name} packaging`} />
                <ul>
                    <li>List price: {gameData.msrp_text}</li>
                    <li>Number of players: {gameData.min_players} to {gameData.max_players} people</li>
                    <li>Minimum age: {gameData.min_age}</li>
                    <li>Playtime: {gameData.min_playtime} to {gameData.max_playtime} minutes</li>
                    <li><a href={gameData.rules_url} target="_blank" rel="noreferrer">Rules</a></li>
                </ul>
                <p>{gameData.description_preview}</p>
                <h3>User reviews</h3>
                <ul>
                    {reviewComponents}
                </ul>
                <AddReview gameName={gameData.name}/>
            </section>
        )
    }
}

export default Game;