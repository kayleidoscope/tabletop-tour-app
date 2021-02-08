import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './MyGamesMini.css'

class MyGamesMini extends Component {

    render() {
        const havePlayed = this.props.usersGamesData.user_played
        const love = this.props.usersGamesData.user_loved
        const wantToPlay = this.props.usersGamesData.user_saved

        return (
            <li className="my-games-mini">
                <img src={this.props.gameData.small_image} alt={`${this.props.gameData.name} packaging`}/>
                <Link to={`/game/${this.props.gameData.id}`}>
                    <h3>{this.props.gameData.name}</h3>
                </Link>
                <div className="icons">
                    {havePlayed ? <p className="on"><strong>Played</strong></p> : <p>Played</p>}
                    {love ? <p className="on"><strong>Loved</strong></p> : <p>Loved</p>}
                    {wantToPlay ? <p className="on"><strong>Saved</strong></p> : <p>Saved</p>}
                </div>
            </li>
        )
    }
}

export default MyGamesMini;