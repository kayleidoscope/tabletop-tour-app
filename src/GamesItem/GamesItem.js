import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context'
import './GamesItem.css'

class GamesItem extends Component {
    static contextType = Context

    render() {
        let gameData = this.props.gameInfo

        if (!gameData) {
            return null
        }

        const myDataNodes = <div className="nodes">
            <p className={this.props.myData.have_played ? "on" : ""}>Played</p>
            <p className={this.props.myData.love ? "on" : ""}>Love</p>
            <p className={this.props.myData.want_to_play ? "on" : ""}>Crave</p>
        </div>

        return (
            <li className="gamesItem">
                <Link to={`/game/${gameData.id}`}>
                    <h3>{gameData.name}</h3>
                </Link>
                <div className="imageAndInfo">
                <img src={gameData.images.small} alt={`${gameData} packaging`}/>
                    <ul >
                        <li>List price: {gameData.msrp_text}</li>
                        <li>Number of players: {gameData.min_players} to {gameData.max_players} people</li>
                        <li>Minimum age: {gameData.min_age}</li>
                        <li>Playtime: {gameData.min_playtime} to {gameData.max_playtime} minutes</li>
                        <li><a href={gameData.rules_url} target="_blank">Rules</a></li>
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