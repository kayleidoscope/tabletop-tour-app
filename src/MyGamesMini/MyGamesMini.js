import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './MyGamesMini.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faPlay } from '@fortawesome/free-solid-svg-icons'

class MyGamesMini extends Component {

    render() {
        if(!this.props.gameData || !this.props.usersGamesData) {
            return null
        }

        const havePlayed = this.props.usersGamesData.user_played
        const love = this.props.usersGamesData.user_loved
        const wantToPlay = this.props.usersGamesData.user_saved

        return (
            <li className="my-games-mini">
                <img className="mini-game-image" src={this.props.gameData.small_image} alt={`${this.props.gameData.name} packaging`}/>
                <Link to={`/game/${this.props.gameData.id}`}>
                    <h4>{this.props.gameData.name}</h4>
                </Link>
                <div className="icons">
                    {havePlayed ? <FontAwesomeIcon icon={faPlay} aria-hidden="true" title="game played" className="on" aria-label="game played"/> : <FontAwesomeIcon  aria-hidden="true" title="not played" icon={faPlay}  aria-label="game not played"/>}
                    {love ? <FontAwesomeIcon icon={faHeart}  aria-hidden="true" title="game loved"className="on" aria-label="game loved"/> : <FontAwesomeIcon  aria-hidden="true" title="not loved" icon={faHeart} aria-label="game not loved" />}
                    {wantToPlay ?<FontAwesomeIcon icon={faBookmark}  aria-hidden="true" title="game bookmarked"className="on" aria-label="game bookmarked"/> : <FontAwesomeIcon  aria-hidden="true" title="not bookmarked" icon={faBookmark}  aria-label="game not bookmarked"/>}
                </div>
            </li>
        )
    }
}

export default MyGamesMini;