import React, {Component} from 'react';
import './GamesList.css'
import GamesItem from '../GamesItem/GamesItem'

//a reusable list of games to be used throughout the site
class GamesList extends Component {
    render() {
        let games = this.props.games
        let myGamesData = this.props.myData

        //create <li>'s for each game
        let gamesLis = games.map((game, i) => {
            let myData = {}
            if (myGamesData) {
                myData = myGamesData.find(myGame => myGame.game_id === game.id)
            }
            return (
                <GamesItem
                    gameInfo={game} 
                    key={game.id} 
                    descriptions={this.props.descriptions}
                    myData = {myData}
                />
            )
        })
        return (
            <section className="gamesList">
                <ul className="gamesItems">
                    {gamesLis}
                </ul>
            </section>
        )
    }
}

export default GamesList;