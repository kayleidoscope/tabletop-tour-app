import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import Review from './Review';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const reviewData = {
    game: "A game",
    id: 1,
    rating: 5,
    text: "This is the best game I've ever played!",
    username: "",
    date_created: "1/15/2021"
}
  ReactDOM.render(
    // <MemoryRouter>
      <Review reviewData={reviewData}/>,
    // </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
