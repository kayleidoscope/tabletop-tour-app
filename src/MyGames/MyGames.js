import React, {Component} from 'react';
import './MyGames.css'
import GamesList from '../GamesList/GamesList'
import Context from '../Context'
import {Redirect} from 'react-router-dom';
import dummyData from '../dummyData'

class MyGames extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            infoBox: false
        }
    }

    componentDidMount() {
        if(this.context.allGamesData.length === 0) {
            this.context.setAllGames()
            this.context.getUserGames(this.context.currentUserId)
        }
    }

    expandInfoBox = e => {
        this.setState({
            infoBox: true
        })
    }

    collapseInfoBox = e => {
        this.setState({
            infoBox: false
        })
    }

    render() {
        if(!this.context.currentUserId) {
            return <Redirect to="/" />
        }
        const myGames = this.context.userGames
        const gameData = this.context.allGamesData

        
        let gamesCloset = myGames.filter(game => game.user_played || game.user_loved)
        let dreamGames = myGames.filter(game => !(game.user_played) && (game.user_saved))
        
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
                {!this.state.infoBox && <button onClick={this.expandInfoBox}>What is this page?</button>}
                {this.state.infoBox && 
                    <div>
                        <p>Below you'll find two sections:</p>
                        <p>My Games Closet contains games you've said that you have played or that you love.
                        It will also contain games you've saved if you have already played them.</p>
                        <p>My Dream Games contains games you've saved, but haven't played yet.</p>
                        <button onClick={this.collapseInfoBox}>Got it, thanks!</button>
                    </div>}
                {/* <h3>Filter</h3>
                <SearchForm /> */}
                <h3>My Games Closet</h3>
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