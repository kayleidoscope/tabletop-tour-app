import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context'
import './GamesItem.css'

class GamesItem extends Component {
    static contextType = Context

    render() {
        let gameData = this.props.gameInfo

        let gameImage = gameData.small_image || gameData.images.small
        let gameRules = gameData.rules_url || gameData.rules
        let gameCost = gameData.msrp_text || gameData.msrp

        if (!gameData) {
            return null
        }

        const myDataNodes = <div className="nodes">
                {this.props.myData.user_played ? <p className="on"><strong>Played</strong></p> : <p>Played</p>}
                {this.props.myData.user_loved ? <p className="on"><strong>Loved</strong></p> : <p>Loved</p>}
                {this.props.myData.user_saved ? <p className="on"><strong>Saved</strong></p> : <p>Saved</p>}
        </div>

        return (
            <li className="gamesItem">
                <Link to={`/game/${gameData.id}`}>
                    <h3>{gameData.name}</h3>
                </Link>
                <div className="imageAndInfo">
                <img src={gameImage} alt={`${gameData} packaging`}/>
                    <ul >
                        <li>List price: {gameCost}</li>
                        <li>Number of players: {gameData.min_players} to {gameData.max_players} people</li>
                        <li>Minimum age: {gameData.min_age}</li>
                        <li>Playtime: {gameData.min_playtime} to {gameData.max_playtime} minutes</li>
                        {gameRules && <li><a href={gameRules} target="_blank" rel="noreferrer">Rules</a></li>}
                        {/* <li>Categories: {gameData.categories}</li> */}
                    </ul>
                </div>
                {this.props.descriptions && <p>{gameData.description_preview}</p>}
                {!this.props.descriptions && myDataNodes}
            </li>
        )
    }
}

export default GamesItem;