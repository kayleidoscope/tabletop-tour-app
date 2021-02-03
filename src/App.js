import React, {Component} from 'react';
import Heading from './Heading/Heading'
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router'
import Context from './Context'
import Landing from './Landing/Landing'
import About from './About/About'
import Home from './Home/Home'
import MyGames from './MyGames/MyGames'
import Game from './Game/Game'
import Discover from './Discover/Discover'
import dummyData from './dummyData'
import Footer from './Footer/Footer'

class App extends Component {
  state = {
    currentUserId: null,
    currentUserName: "",
    currentGame: {}
  }

  demoLogIn = (e) => {
    this.setState({
      currentUserId: dummyData[0].users[0].id,
      currentUserName: dummyData[0].users[0].username
    })
    this.props.history.push("/home")
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

  render() {
    const contextValue={
      currentUserId: this.state.currentUserId,
      demoLogIn: this.demoLogIn,
      demoLogOut: this.demoLogOut,
      gameSelected: this.gameSelected,
      history: this.props.history
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