import React, {Component} from 'react';
import './Home.css'
import Review from '../Review/Review'
import Context from '../Context'
import {Link, Redirect} from 'react-router-dom';
import MyGamesMini from '../MyGamesMini/MyGamesMini'

class Home extends Component {
    static contextType = Context

    
    render() {
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
                <h2>Welcome, {this.context.currentUserName}!</h2>
                <h3>Games</h3>
                <Link to="/my-games">
                    <h4>My games log</h4>
                </Link>
                <ul className="mini-games">
                    {miniMyGames}
                </ul>
                <h3>My reviews</h3>
                <ul>
                    {reviewComponents}
                </ul>
            </section>
        )
    }
}

export default Home;