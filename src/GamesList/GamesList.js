import React, {Component} from 'react';
import './GamesList.css'
import GamesItem from '../GamesItem/GamesItem'

class GamesList extends Component {
    render() {
        let games = this.props.games

        let gamesLis = games.map(game => {
            return (
                <GamesItem gameInfo={game} key={game.id} />
            )
        })
        return (
            <section className="gamesList">
                <h2>Search Results</h2>
                <ul>
                    {gamesLis}
                </ul>
            </section>
        )
    }
}

export default GamesList;