import React, {Component} from 'react';
import './MyGamesMini.css'

//This should be broken up into more components than this

class MyGames extends Component {

    render() {
        const havePlayed = this.props.usersGamesData.have_played
        const love = this.props.usersGamesData.love
        const wantToPlay = this.props.usersGamesData.want_to_play

        return (
            <li className="my-games-mini">
                <img src={this.props.gameData.images.small} />
                <h5>{this.props.gameData.name}</h5>
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