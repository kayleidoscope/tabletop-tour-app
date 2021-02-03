import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './MyGamesMini.css'

class MyGames extends Component {

    render() {
        const havePlayed = this.props.usersGamesData.have_played
        const love = this.props.usersGamesData.love
        const wantToPlay = this.props.usersGamesData.want_to_play

        return (
            <li className="my-games-mini">
                <img src={this.props.gameData.images.small} alt={`${this.props.gameData.name} packaging`}/>
                <Link to={`/game/${this.props.gameData.id}`}>
                    <h5>{this.props.gameData.name}</h5>
                </Link>
                <div className="icons">
                    {havePlayed && <p>Played</p>}
                    {love && <p>Love</p>}
                    {wantToPlay && <p>Crave</p>}
                </div>
            </li>
        )
    }
}

export default MyGames;