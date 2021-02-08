import React, {Component} from 'react';
import './Home.css'
import Review from '../Review/Review'
import Context from '../Context'
import {Link, Redirect} from 'react-router-dom';
import MyGamesMini from '../MyGamesMini/MyGamesMini'
import config from '../config'

class Home extends Component {
    static contextType = Context

    constructor(props) {
      super(props);
      this.state = {
          infoBox: false,
          userReviews: []
      }
  }

  componentDidMount() {
    if(this.context.userGames.length === 0) {
      this.context.setAllGames()
    }
      const userFromStorage = JSON.parse(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`)) ? JSON.parse(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`)) : 1
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
          this.setState({
            userReviews: responseJson
          })
        })
        .catch(error => {
          console.error(error)
        })
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

editReview = newReview => {  
  this.setState((state) => ({userReviews: state.userReviews.map(review => !(review.game_id === newReview.game_id && review.user_id === newReview.user_id) ? review : newReview)}))
}
    
    render() {

        if(!this.context.currentUserId) {
            return <Redirect to="/" />
        }

        if(!this.context.allGamesData) {
          return null
        }

        const reviews = this.state.userReviews

        const reviewComponents = reviews.map(review => {
            return (
                <Review reviewData={review} key={`R${review.user_id}-${review.game_id}`} editReview={this.editReview}/>
            )
        })

        const allUsersGames = this.context.userGames.filter(game => game.user_played || game.user_loved || game.user_saved)
        
        const tenUsersGames = allUsersGames.slice(0, 10)

        const gameData = this.context.allGamesData

        const miniMyGames = tenUsersGames.map((game, i) => {
            const thisGameData = gameData.find(game => game.id === tenUsersGames[i].game_id)
            return (
                <MyGamesMini 
                    key={`${tenUsersGames[i].user_id}-${tenUsersGames[i].game_id}`}
                    gameData = {thisGameData}
                    usersGamesData = {game}
                />
            )
        })

        return (
            <section className="home">
                {!this.state.infoBox && <button onClick={this.expandInfoBox}>What is this page?</button>}
                {this.state.infoBox && 
                    <div>
                        <p>This page has two sections:</p>
                        <p>My Games Log will display up to 10 games that you've saved, loved, or played. 
                        </p>
                        <p>You can click through My Games Log to see all of the games you've logged, including more detailed information.
                        </p>
                        <p>My Reviews displays your reviews.</p>
                        <button onClick={this.collapseInfoBox}>Got it, thanks!</button>
                    </div>}
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