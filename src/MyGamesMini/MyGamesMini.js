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
                    <h5>{this.props.gameData.name}</h5>
                </Link>
                <div className="icons">
                    {havePlayed && <p>Played</p>}
                    {love && <p>Loved</p>}
                    {wantToPlay && <p>Saved</p>}
                </div>
            </li>
        )
    }
}

export default MyGamesMini;