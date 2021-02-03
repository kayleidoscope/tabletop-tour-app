import React, {Component} from 'react';
import './Home.css'
import Review from '../Review/Review'
import dummyData from '../dummyData'
import {Link} from 'react-router-dom';
import MyGamesMini from '../MyGamesMini/MyGamesMini'

class Home extends Component {

    render() {
        const reviews = dummyData[0].reviews

        const reviewComponents = reviews.map(review => {
            return (
                <Review reviewData={review} key={review.id} />
            )
        })

        const usersGames = dummyData[0].users_games
        const gameData = dummyData[0].games

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
                <h2>Welcome, user!</h2>
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