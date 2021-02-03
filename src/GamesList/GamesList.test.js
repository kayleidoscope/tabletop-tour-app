import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import GamesList from './GamesList';
import '../dummyData'
import dummyData from '../dummyData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const gameData = dummyData[0].games
  ReactDOM.render(
    <MemoryRouter>
      <GamesList games={gameData} />,
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
