import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context'
import './GamesItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faPlay } from '@fortawesome/free-solid-svg-icons'

class GamesItem extends Component {
    static contextType = Context

    render() {
        let gameData = this.props.gameInfo

        let gameImage = gameData.small_image || gameData.images.small
        let gameRules = gameData.rules_url || gameData.rules
        let gameCost = gameData.msrp_text || `$${gameData.msrp}`
        let gameAge = gameData.min_age === 0 ? "" : `Minimum age: ${gameData.min_age}`
        let gameTime = gameData.min_playtime === gameData.max_playtime ? `Playtime: ${gameData.min_playtime} minutes` : `Playtime: ${gameData.min_playtime} to ${gameData.max_playtime} minutes`
        let gamePlayers = gameData.min_players === gameData.max_players ? `Players: ${gameData.min_players} people` : `Players: ${gameData.min_players} to ${gameData.max_players} people`

        if (!gameData) {
            return null
        }

        const myDataNodes = <div className="nodes">
                {this.props.myData.user_played ? <FontAwesomeIcon icon={faPlay} aria-hidden="true" title="game played" className="on" aria-label="game played"/> : <FontAwesomeIcon  aria-hidden="true" title="not played" icon={faPlay}  aria-label="game not played"/>}
                {this.props.myData.user_loved ? <FontAwesomeIcon icon={faHeart}  aria-hidden="true" title="game loved"className="on" aria-label="game loved"/> : <FontAwesomeIcon  aria-hidden="true" title="not loved" icon={faHeart} aria-label="game not loved" />}
                {this.props.myData.user_saved ? <FontAwesomeIcon icon={faBookmark}  aria-hidden="true" title="game bookmarked"className="on" aria-label="game bookmarked"/> : <FontAwesomeIcon  aria-hidden="true" title="not bookmarked" icon={faBookmark}  aria-label="game not bookmarked"/>}
        </div>

        return (
            <li className="gamesItem">
                <Link to={`/game/${gameData.id}`} className="games-header">
                    <h4>{gameData.name}</h4>
                </Link>
                <div className="imageAndInfo">
                <img src={gameImage} alt={`${gameData} packaging`}/>
                    <ul >
                        <li>List price: {gameCost}</li>
                        <li>{gamePlayers}</li>
                        <li>{gameAge}</li>
                        <li>{gameTime}</li>
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