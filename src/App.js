import React from 'react';
import Heading from './heading/heading'
import Landing from './landing/landing'
import About from './about/about'
import Home from './home/home'
import MyGames from './my-games/my-games'
import Game from './game/game'
import Discover from './Discover/Discover'

//Visible to everybody
//For /: <Landing />
//For /about: <About />
//For /home: <Home />
//For /game/:gameId: <Game />
//For /discover: <Discover />

//Only visible to logged in users
//For /home/my-games: <MyGames />

function App() {
  return (
    <main className='App'>
      <Heading />
    </main>
  );
}

export default App;