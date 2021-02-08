import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import Review from './Review';
import Context from '../Context'
import dummyData from '../dummyData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const reviewData = {
    game: "A game",
    user_id: 1,
    game_id: "AuBvbISHR6",
    rating: 5,
    text: "This is the best game I've ever played!",
    username: "",
    date_created: "1/15/2021"
}

const testContext = {
  allGamesData: dummyData[0].games
}

  ReactDOM.render(
    <Context.Provider value={testContext}>
      <Review reviewData={reviewData}/>
    </Context.Provider>
      ,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
