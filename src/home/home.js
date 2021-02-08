import React, {Component} from 'react';
import './Home.css'
import Review from '../Review/Review'
import Context from '../Context'
import {Link, Redirect} from 'react-router-dom';
import MyGamesMini from '../MyGamesMini/MyGamesMini'
import config from '../config'

class Home extends Component {
    static contextType = Context
    
    render() {
        if(this.context.userGames.length === 0) {
            this.context.setAllGames()
            const userFromStorage = JSON.parse(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`))
            fetch(`${config.API_ENDPOINT}api/users-games?user_id=${userFromStorage.id}`, {
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
                this.context.setUserGames(responseJson)
              })
              .catch(error => {
                console.error(error)
              })
            fetch(`${config.API_ENDPOINT}api/reviews?user_id=${userFromStorage.id}`, {
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
                this.context.setReviews(responseJson)
              })
              .catch(error => {
                console.error(error)
              })
      }
        if(!this.context.currentUserId) {
            return <Redirect to="/" />
        }

        const reviews = this.context.userReviews

        const reviewComponents = reviews.map(review => {
            return (
                <Review reviewData={review} key={`R${review.user_id}-${review.game_id}`} />
            )
        })

        const usersGames = this.context.userGames.filter(game => game.user_played || game.user_loved || game.user_saved)
        const gameData = this.context.allGamesData

        const miniMyGames = usersGames.map((game, i) => {
            const thisGameData = gameData.find(game => game.id === usersGames[i].game_id)
            return (
                <MyGamesMini 
                    key={`${usersGames[i].user_id}-${usersGames[i].game_id}`}
                    gameData = {thisGameData}
                    usersGamesData = {game}
                />
            )
        })

        return (
            <section className="home">
                <Link to="/my-games">
                    <h2>My Games Log</h2>
                </Link>
                <ul className="mini-games">
                    {miniMyGames}
                </ul>
                <h2>My reviews</h2>
                <ul>
                    {reviewComponents}
                </ul>
            </section>
        )
    }
}

export default Home;