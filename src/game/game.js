import React, {Component} from 'react';
import './Game.css'
import config from '../config'
import dummyData from '../dummyData'
import Review from '../Review/Review'
import AddReview from '../AddReview/AddReview'
import Context from '../Context'

class Game extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            gameData: {},
            loved: false,
            played: false,
            saved: false,
            reviews: []
        }
    }

    componentDidMount() {
        const gameId = this.props.match.params.id

        const gameData = this.context.allGamesData.find(game => game.id === gameId)

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
            this.setState({
                gameData
            })
        }

        if(gameData) {
            const gameStats = this.context.userGames.find(game => game.game_id === gameId)

            if (!gameStats){
                return
            }

            this.setState({
                loved: gameStats.user_loved,
                played: gameStats.user_played,
                saved: gameStats.user_saved
            })
        }

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

        fetch(`${config.API_ENDPOINT}api/games`, {
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

    handleLovedChange = e => {
        this.setState({
            loved: e.currentTarget.checked
        })

        const gameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)
        
        if(!gameData) {
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                this.addLocalGameData()
            }
            const newGameDataEntry = {
                user_id: this.context.currentUserId, 
                game_id: this.props.match.params.id,
                user_loved: e.currentTarget.checked
            }
            fetch(`${config.API_ENDPOINT}api/users-games`, {
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
        } else {
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


    handlePlayedChange = e => {
        this.setState({
            played: e.currentTarget.checked
        })

        const gameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)


        if(!gameData) {
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                console.log('no local data')
                this.addLocalGameData()
            }
            const newGameDataEntry = {
                user_id: this.context.currentUserId, 
                game_id: this.props.match.params.id,
                user_played: e.currentTarget.checked
            }
            fetch(`${config.API_ENDPOINT}api/users-games`, {
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
        } else {
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

    updateReviews = newReview => {
        console.log('updateReviews ran')
        this.setState({
          reviews: [...this.state.reviews, newReview]
        })
      }

    handleSavedChange = e => {
        this.setState({
            saved: e.currentTarget.checked
        })

        const gameData = this.context.userGames.find(game => game.game_id === this.props.match.params.id)
        
        if(!gameData) {
            const localGameData = this.context.allGamesData.find(game => game.id === this.props.match.params.id)
            if(!localGameData) {
                this.addLocalGameData()
            }
            const newGameDataEntry = {
                user_id: this.context.currentUserId, 
                game_id: this.props.match.params.id,
                user_saved: e.currentTarget.checked
            }
            fetch(`${config.API_ENDPOINT}api/users-games`, {
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
        } else {
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

        const usersGameData = this.context.userGames

        if (Object.keys(gameData).length === 0) {
            return null
        }

        const reviewComponents = this.state.reviews.map(review => {
            return (
                <Review reviewData={review} key={`R${review.user_id}-${review.game_id}`} />
            )
        })

        return (
            <section>
                <h2>{gameData.name}</h2>
{this.context.currentUserId &&                <form>
                    <input type="checkbox" id="own" name="own" checked={this.state.played} onChange={this.handlePlayedChange}/>
                    <label htmlFor="own">I've played this</label>
                    <br />
                    <input type="checkbox" id="love" name="love" checked={this.state.loved} onChange={this.handleLovedChange} />
                    <label htmlFor="love">I love this</label>
                    <br />
                    <input type="checkbox" id="want" name="want"  checked={this.state.saved} onChange={this.handleSavedChange}/>
                    <label htmlFor="want">I want to play this</label>
                </form>}
                {!this.context.currentUserId && <p>Log in to track the games you've played!</p>}
                <img src={gameData.medium_image ? gameData.medium_image : gameData.images.medium} alt={`${gameData.name} packaging`} />
                <ul>
                    <li>List price: {gameData.msrp_text}</li>
                    <li>Number of players: {gameData.min_players} to {gameData.max_players} people</li>
                    <li>Minimum age: {gameData.min_age}</li>
                    <li>Playtime: {gameData.min_playtime} to {gameData.max_playtime} minutes</li>
                    <li><a href={gameData.rules_url} target="_blank" rel="noreferrer">Rules</a></li>
                </ul>
                <p>{gameData.description_preview}</p>
                <h3>User reviews</h3>
                <ul>
                    {reviewComponents}
                </ul>
{this.context.currentUserId &&                <AddReview 
                    gameName={gameData.name} 
                    gameId={this.props.match.params.id}
                    updateReviews={this.updateReviews}
                />}
                {!this.context.currentUserId && <p>Log in to post a review!</p>}
            </section>
        )
    }
}

export default Game;