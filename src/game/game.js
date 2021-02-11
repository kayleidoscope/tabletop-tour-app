import React, {Component} from 'react';
import './Game.css'
import config from '../config'
import Review from '../Review/Review'
import {Link} from 'react-router-dom';
import AddReview from '../AddReview/AddReview'
import Context from '../Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class Game extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            gameData: {},
            loved: false,
            played: false,
            saved: false,
            reviews: [],
            infoBox: false
        }
    }

    //handles the ? info box opening and closing
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


    componentDidMount() {
        const gameId = this.props.match.params.id

        const gameData = this.context.allGamesData.find(game => game.id === gameId)

        //if this game isn't stored in the local game data, find it from the Board Games Atlas API
        if (!gameData) {
            fetch(`${config.BGA_BASE_URL}/search?ids=${gameId}&client_id=${config.BGA_CLIENT_ID}`, {
                method: 'GET'
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.status)
                    }
                    return res.json()
                })
                .then(responseJson => this.setState({gameData: responseJson.games[0]}))
                .catch(error => {
                    console.error(error)
                })
        } else {
            //if this game is in the local game data, add its data to state
            this.setState({
                gameData
            })
        }

        if(gameData) {
            //search for user stats on this game
            const gameStats = this.context.userGames.find(game => game.game_id === gameId)

            if (!gameStats){
                //if there aren't any, end this if statement
                return
            }

            this.setState({
                loved: gameStats.user_loved,
                played: gameStats.user_played,
                saved: gameStats.user_saved
            })
        }

        //get reviews for thei game
        fetch(`${config.API_ENDPOINT}api/reviews?game_id=${gameId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_TOKEN}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => this.setState({reviews: responseJson}))
            .catch(error => {
                console.error(error)
            })
        
            //if userGames or allGamesData has been wiped from memory, grab it again now
            if(this.context.userGames.length === 0) {
                this.context.setAllGames()
                const userFromStorage = JSON.parse(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`))
                fetch(`${config.API_ENDPOINT}api/users-games/${userFromStorage.id}/${this.props.match.params.id}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`
                  }
                })
                  .then(res => {
                    if(!res.ok) {
                      throw new Error(res.status)
                    }
                    return res.json()
                  })
                  .then(responseJson => {
                    this.setState({
                        played: responseJson.user_played,
                        loved: responseJson.user_loved,
                        saved: responseJson.user_saved
    
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })
          }
    }

    addLocalGameData() {
        const newGameEntry = {
            id: this.props.match.params.id,
            name: this.state.gameData.name,
            msrp: this.state.gameData.msrp,
            min_players: this.state.gameData.min_players,
            max_players: this.state.gameData.max_players,
            min_playtime: this.state.gameData.min_playtime,
            max_playtime: this.state.gameData.max_playtime,
            min_age: this.state.gameData.min_age,
            description: this.state.gameData.description_preview,
            rules: this.state.gameData.rules,
            small_image: this.state.gameData.images.small,
            medium_image: this.state.gameData.images.medium,
            original_image: this.state.gameData.images.original
        }

        //return this fetch so this function doesn't resolve a promise and can have ".this" chained to it
        return fetch(`${config.API_ENDPOINT}api/games`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newGameEntry)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.gameAdded(responseJson)
                return
            })
            .catch(error => {
                console.error(error)
            })
    }

    //handles the fetch POST for when a user hasn't loved, liked, or saved this game yet
    addNewUserDataLove = (boolean) => {
        const newGameDataEntry = {
            user_id: this.context.currentUserId, 
            game_id: this.props.match.params.id,
            user_loved: boolean
        }

        //return this fetch so this function doesn't resolve a promise and can have ".this" chained to it
        return fetch(`${config.API_ENDPOINT}api/users-games`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newGameDataEntry)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.userGameAdded(responseJson)
                return
            })
            .catch(error => {
                console.error(error)
            })
    }

    //handles it when the user checks or unchecks the Loved checkbox
    handleLovedChange = async(e) => {
        this.setState({
            loved: e.currentTarget.checked
        })

        //check user games to see if the user has already logged this game before
        const userGameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)

        //save the boolean that the user just changed Loved to
        const bool = e.currentTarget.checked

        //if the user has not logged this game before,...
        if(!userGameData) {
            //...check to see if the game has been logged by anyone before...
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                //...if it hasn't, add its data to the local games database
                await this.addLocalGameData()
            }
            //no matter what, then handle adding the new user game data
            await this.addNewUserDataLove(bool)
        } else {
            //if the user has logged this game before, use a patch request to update it
            const loveChange = {user_loved: e.currentTarget.checked}
    
            fetch(`${config.API_ENDPOINT}api/users-games/${this.context.currentUserId}/${this.props.match.params.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.API_TOKEN}`
                },
                body: JSON.stringify(loveChange)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.status)
                    }
                })
                .then(responseJson => this.context.gameOpinionChanged(this.props.match.params.id, "user_loved", loveChange))
                .catch(error => {
                    console.error(error)
                })
        }
        }

    //handles the fetch POST for when a user hasn't loved, liked, or saved this game yet
    addNewUserDataPlay = (boolean) => {
        const newGameDataEntry = {
            user_id: this.context.currentUserId, 
            game_id: this.props.match.params.id,
            user_played: boolean
        }

        //return this fetch so this function doesn't resolve a promise and can have ".this" chained to it
        return fetch(`${config.API_ENDPOINT}api/users-games`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newGameDataEntry)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.userGameAdded(responseJson)
                return
            })
            .catch(error => {
                console.error(error)
            })
    }

    //handles it when the user checks or unchecks the Loved checkbox
    handlePlayedChange = async(e) => {
        this.setState({
            played: e.currentTarget.checked
        })

        //check user games to see if the user has already logged this game before
        const userGameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)
        
        //save the boolean that the user just changed Played to
        const bool = e.currentTarget.checked

        //if the user has not logged this game before,...
        if(!userGameData) {
            //...check to see if the game has been logged by anyone before...
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                //...if it hasn't, add its data to the local games database
                await this.addLocalGameData()
            }
            //no matter what, then handle adding the new user game data
            await this.addNewUserDataPlay(bool)
        } else {
            //if the user has logged this game before, use a patch request to update it
            const playChange = {user_played: e.currentTarget.checked}
    
            fetch(`${config.API_ENDPOINT}api/users-games/${this.context.currentUserId}/${this.props.match.params.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.API_TOKEN}`
                },
                body: JSON.stringify(playChange)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.status)
                    }
                })
                .then(responseJson => this.context.gameOpinionChanged(this.props.match.params.id, "user_played", playChange))
                .catch(error => {
                    console.error(error)
                })
        }

    }

    addReview = newReview => {
        this.setState({
          reviews: [...this.state.reviews, newReview]
        })
    }

    editReview = newReview => {  
        this.setState((state) => ({reviews: state.reviews.map(review => !(review.game_id === newReview.game_id && review.user_id === newReview.user_id) ? review : newReview)}))
    }

    //handles the fetch POST for when a user hasn't loved, liked, or saved this game yet
    addNewUserDataSave = (boolean) => {
        const newGameDataEntry = {
            user_id: this.context.currentUserId, 
            game_id: this.props.match.params.id,
            user_saved: boolean
        }

        //return this fetch so this function doesn't resolve a promise and can have ".this" chained to it
        return fetch(`${config.API_ENDPOINT}api/users-games`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newGameDataEntry)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.userGameAdded(responseJson)
                return
            })
            .catch(error => {
                console.error(error)
            })
    }

    //handles it when the user checks or unchecks the Saved checkbox
    handleSavedChange = async(e) => {
        this.setState({
            saved: e.currentTarget.checked
        })

        //save the boolean that the user just changed Saved to
        const bool = e.currentTarget.checked
        
        //check user games to see if the user has already logged this game before
        const userGameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)
        
        //if the user has not logged this game before,...
        if(!userGameData) {
            //...check to see if the game has been logged by anyone before...
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                //...if it hasn't, add its data to the local games database
                await this.addLocalGameData()
            }
            //no matter what, then handle adding the new user game data
            await this.addNewUserDataSave(bool)
        } else {
            //if the user has logged this game before, use a patch request to update it
            const saveChange = {user_saved: e.currentTarget.checked}
    
            fetch(`${config.API_ENDPOINT}api/users-games/${this.context.currentUserId}/${this.props.match.params.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.API_TOKEN}`
                },
                body: JSON.stringify(saveChange)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.status)
                    }
                })
                .then(responseJson => this.context.gameOpinionChanged(this.props.match.params.id, "user_saved", saveChange))
                .catch(error => {
                    console.error(error)
                })
        }
    }

    render() {
        const gameData = this.state.gameData

        //these account for whether the data is being taken from the local database or the Board Games Atlas API
        const description = gameData.description_preview || gameData.description
        const rules = gameData.rules_url || gameData.rules
        const cost = gameData.msrp_text || gameData.msrp

        //these account for if data comes in null
        let gameCost = cost !== "0" ? gameData.msrp_text || `$${gameData.msrp}` : "No data available."
        let gameTime = gameData.min_playtime === gameData.max_playtime ? `Playtime: ${gameData.min_playtime} minutes` : `Playtime: ${gameData.min_playtime} to ${gameData.max_playtime} minutes`
        let gamePlayers = gameData.min_players === gameData.max_players ? `Players: ${gameData.min_players} people` : `Players: ${gameData.min_players} to ${gameData.max_players} people`

        //if no gameData has been brought over yet, don't render the page
        if (Object.keys(gameData).length === 0) {
            return null
        }

        const userReview = this.state.reviews.find(review => review.user_id === this.context.currentUserId)
        
        const reviewComponents = this.state.reviews.map(review => {
            return (
                <Review reviewData={review} key={`R${review.user_id}-${review.game_id}`}  editReview={this.editReview}/>
            )
        })

        return (
            <section className="game">
                <div className="page-header">
                    <h2>{gameData.name}</h2>
                    {!this.state.infoBox && <button className="what-btn" onClick={this.expandInfoBox}><FontAwesomeIcon className="what-btn-icon" icon={faQuestionCircle} aria-hidden="true" title="What is this page?" aria-label="What is this page?"/></button>}
                </div>
                {this.state.infoBox && 
                    <div className="info-box">
                        <p>This page contains information on {gameData.name}.</p>
                        <p>If you are logged in, you can use this page to keep track of whether
                            you have played this game, love this game, or want to play this game.
                        </p>
                        <p>You can also write reviews if you are logged in.</p>
                        <button onClick={this.collapseInfoBox}>Got it, thanks!</button>
                    </div>}
{this.context.currentUserId &&                <form className="checkboxes">
                    <div>
                        <input type="checkbox" id="own" name="own" checked={this.state.played} onChange={this.handlePlayedChange}/>
                        <label htmlFor="own">Played</label>
                    </div>
                    <div>
                        <input type="checkbox" id="love" name="love" checked={this.state.loved} onChange={this.handleLovedChange} />
                        <label htmlFor="love">Love</label>
                    </div>
                    <div>
                        <input type="checkbox" id="want" name="want"  checked={this.state.saved} onChange={this.handleSavedChange}/>
                        <label htmlFor="want">Want to play</label>
                    </div>
                </form>}
                {!this.context.currentUserId && <p><Link to="/">Log in</Link> to track the games you've played!</p>}
                <div className="bigger-screen">
                    <img src={gameData.medium_image ? gameData.medium_image : gameData.images.medium} alt={`${gameData.name} packaging`} />
                    <div className="fast-facts">
                        <h3>Fast facts:</h3>
                        <ul>
                            <li>List price: {gameCost}</li>
                            <li>{gamePlayers}</li>
                            <li>Minimum age: {gameData.min_age === 0 ? "Data not available." : gameData.min_age}</li>
                            <li>{gameTime}</li>
                            {rules && <li><a href={rules} target="_blank" rel="noreferrer">Rules</a></li>}
                            {!rules && <li>Rules data not available.</li>}
                        </ul>
                </div>
                </div>
                <p>{description}</p>
                {description.length === 0 && <p>Game description not available.</p>}
                <h3>User reviews</h3>
                {this.state.reviews.length === 0 && <p>This game has no reviews yet.</p>}
                <ul>
                    {reviewComponents}
                </ul>
{this.context.currentUserId && !userReview &&               <AddReview 
                    gameName={gameData.name} 
                    gameId={this.props.match.params.id}
                    gameData={this.state.gameData}
                    addReview={this.addReview}
                />}
                {!this.context.currentUserId && <p><Link to="/">Log in</Link> to post a review!</p>}
                {userReview && <div>
                        <h3>Review {gameData?.name}</h3>
                        <p>You've already reviewed this game, and may not write a second review.</p>
                        <p>Click the Edit Review link on your review to change your review.</p>
                    </div>}
            </section>
        )
    }
}

export default Game;