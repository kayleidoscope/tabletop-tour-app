import React, {Component} from 'react';
import './my-games.css'
import SearchForm from '../SearchForm/SearchForm'
import dummyData from '../dummyData'
import GamesList from '../GamesList/GamesList'

//This should be broken up into more components than this

class MyGames extends Component {

    render() {
        const myGames = dummyData[0].users_games
        const gameData = dummyData[0].games

        let gamesCloset = myGames.filter(game => game.have_played)
        let dreamGames = myGames.filter(game => !game.have_played)
        
        gamesCloset = gamesCloset.map((game, i) => {
            const thisGameData = gameData.find(game => game.id === gamesCloset[i].game_id)
            return (
                thisGameData
            )
        })

        dreamGames = dreamGames.map((game, i) => {
            const thisGameData = gameData.find(game => game.id === dreamGames[i].game_id)
            return (
                thisGameData
            )
        })

        return (
            <section>
                <h2>My Games Log</h2>
                <h3>Filter</h3>
                <SearchForm />
                <h3>My games closet</h3>
                <ul>
                    <GamesList games={gamesCloset} myData={myGames} descriptions={false}/>
                </ul>
                <h3>My dream games</h3>
                <ul>
                    <GamesList games={dreamGames} myData={myGames} descriptions={false}/>
                </ul>
            </section>
        )
    }
}

export default MyGames;