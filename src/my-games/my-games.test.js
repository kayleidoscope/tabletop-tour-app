import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import MyGames from './my-games';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    // <MemoryRouter>
      <MyGames />,
    // </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
