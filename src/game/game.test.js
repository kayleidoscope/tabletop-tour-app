import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Game match={{params: {gameId: 1}}}/>
      ,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
