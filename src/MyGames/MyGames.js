import React, {Component} from 'react';
import './MyGames.css'
import GamesList from '../GamesList/GamesList'
import Context from '../Context'
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faPlay, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class MyGames extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            infoBox: false
        }
    }

    componentDidMount() {
        //if user games and allGamesData has been wiped, grab it again
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
            <section className="my-games">
                <div className="page-header">
                    <h2>My Games Log</h2>
                    {!this.state.infoBox && <button onClick={this.expandInfoBox} className="what-btn"><FontAwesomeIcon className="what-btn-icon" icon={faQuestionCircle} aria-hidden="true" title="What is this page?" aria-label="What is this page?"/></button>}
                </div>
                {this.state.infoBox && 
                    <div className="info-box">
                        <p>Below you'll find two sections:</p>
                        <p>My Games Closet contains games you've said that you have played (<FontAwesomeIcon icon={faPlay} />) or that you love (<FontAwesomeIcon icon={faHeart} />).
                        It will also contain games you've bookmarked (<FontAwesomeIcon icon={faBookmark} />) if you have already played them.</p>
                        <p>My Dream Games contains games you've bookmarked, but haven't played yet.</p>
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