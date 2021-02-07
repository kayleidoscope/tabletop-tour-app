import React, {Component} from 'react';
import './MyGames.css'
import SearchForm from '../SearchForm/SearchForm'
import dummyData from '../dummyData'
import GamesList from '../GamesList/GamesList'
import Context from '../Context'
import {Redirect} from 'react-router-dom';

class MyGames extends Component {
    static contextType = Context

    render() {
        if(!this.context.currentUserId) {
            return <Redirect to="/" />
        }
        const myGames = this.context.userGames
        const gameData = this.context.allGamesData

        let gamesCloset = myGames.filter(game => game.user_played)
        let dreamGames = myGames.filter(game => !(game.user_played) && game.user_loved || game.user_saved)
        
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
                {/* <h3>Filter</h3>
                <SearchForm /> */}
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