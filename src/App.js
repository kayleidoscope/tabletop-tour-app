import React, {Component} from 'react';
import Heading from './Heading/Heading'
import config from './config'
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router'
import Context from './Context'
import Landing from './Landing/Landing'
import About from './About/About'
import Home from './Home/Home'
import MyGames from './MyGames/MyGames'
import Game from './Game/Game'
import Discover from './Discover/Discover'
import Footer from './Footer/Footer'

class App extends Component {
  state = {
    currentUserId: null,
    currentUserName: "",
    currentGame: {},
    userGames: [],
    userReviews: [],
    allGamesData: []
  }

  setCurrentUser = user => {
    this.setState({
      currentUserId: user.id,
      currentUserName: user.username
    })
  }

  setUserGames = games => {
    this.setState({
      userGames: games
    })
  }

  setReviews = reviews => {
    this.setState({
      userReviews: reviews
    })
  }

  updateUsersReviews = newReview => {
    console.log('updateUsersReviews ran')
    this.setState({
      userReviews: [...this.state.userReviews, newReview]
    })
  }

  demoLogIn = (e) => {
    e.preventDefault()
    const username = "demo_user"

    //API call to create a new user
    fetch(`${config.API_ENDPOINT}api/users?username=${username}`, {
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
            if (JSON.stringify(responseJson).length === 2) {
                this.setState({
                    error: true
                })
                return
            } else {
                this.setCurrentUser(responseJson)
                //sets current user Id to local storage
                localStorage.setItem(
                    `currentUser${config.CURRENT_VERSION}`, JSON.stringify(responseJson)
                )
                this.props.history.push("/home")
                fetch(`${config.API_ENDPOINT}api/users-games?user_id=${responseJson.id}`, {
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
                        this.setUserGames(responseJson)
                    })
                    .catch(error => {
                        console.error(error)
                    })
                fetch(`${config.API_ENDPOINT}api/reviews?user_id=${responseJson.id}`, {
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
                        this.setReviews(responseJson)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        })
        .catch(error => {
            console.error(error)
        })
  }

  demoLogOut = (e) => {
    this.setState({
      currentUserId: null,
      currentUserName: null
    })
  }

  gameSelected = gameData => {
    this.setState({
      currentGame: gameData
    })
  }

  userGameAdded = newUserGame => {
    this.setState({
      userGames: [...this.state.userGames, newUserGame]
    })
  }

  gameAdded = newGame => {
    this.setState({
      allGamesData: [...this.state.allGamesData, newGame]
    })
  }


  gameOpinionChanged = (gameId, key, change) => {
    const gameToChange = this.state.userGames.find(game => game.game_id === gameId)

    gameToChange[key] = change[key]

    this.setState((state) => ({userGames: state.userGames.map(game => game.game_id !== gameId ? game : gameToChange)}))
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/games`, {
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
            allGamesData: responseJson
          })
      })
      .catch(error => {
          console.error(error)
      })

      // if(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`)) {
      //   this.setCurrentUser(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`))
      //   fetch(`${config.API_ENDPOINT}api/users-games?user_id=${localStorage.getItem(`currentUser${config.CURRENT_VERSION}`).id}`, {
      //     method: 'GET',
      //     headers: {
      //       'Authorization': `Bearer ${config.API_TOKEN}`
      //     }
      //   })
      //     .then(res => {
      //       if(!res.ok) {
      //         throw new Error(res.status)
      //       }
      //       return res.json()
      //     })
      //     .then(responseJson => {
      //       this.setUserGames(responseJson)
      //     })
      //     .catch(error => {
      //       console.error(error)
      //     })
      //   fetch(`${config.API_ENDPOINT}api/reviews?user_id=${localStorage.getItem(`currentUser${config.CURRENT_VERSION}`).id}`, {
      //     method: 'GET',
      //     headers: {
      //       'Authorization': `Bearer ${config.API_TOKEN}`
      //     }
      //   })
      //     .then(res => {
      //       if(!res.ok) {
      //         throw new Error(res.status)
      //       }
      //       return res.json()
      //     })
      //     .then(responseJson => {
      //       this.setReviews(responseJson)
      //     })
      //     .catch(error => {
      //       console.error(error)
      //     })
      // this.props.history.push("/home")
      // }
  }

  render() {
    const userFromStorage = localStorage.getItem(`currentUser${config.CURRENT_VERSION}`)
    const contextValue={
      currentUserId: this.state.currentUserId || (userFromStorage && JSON.parse(userFromStorage).id),
      currentUserName: this.state.currentUserName,
      demoLogIn: this.demoLogIn,
      demoLogOut: this.demoLogOut,
      gameSelected: this.gameSelected,
      setCurrentUser: this.setCurrentUser,
      setUserGames: this.setUserGames,
      setReviews: this.setReviews,
      gameOpinionChanged: this.gameOpinionChanged,
      updateUsersReviews: this.updateUsersReviews,
      userGameAdded: this.userGameAdded,
      gameAdded: this.gameAdded,
      history: this.props.history,
      userReviews: this.state.userReviews,
      userGames: this.state.userGames,
      allGamesData: this.state.allGamesData
    }

    return (
      <main className='App'>
        <Context.Provider value={contextValue}>
            <Heading />
            <Route
              exact path="/"
              component={Landing}
            />
            <Route
              path="/about"
              component={About}
            />
            <Route
              path="/discover"
              component={Discover}
            />
            <Route
              path="/game/:id"
              component={Game}
            />
            <Route
              path="/home"
              component={Home}
            />
            <Route
              path="/my-games"
              component={MyGames}
            />
        </Context.Provider>
        <Footer />
      </main>
    );
  }
}

export default withRouter(App);