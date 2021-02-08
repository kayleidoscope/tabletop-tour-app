import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import MyGames from './MyGames';
import dummyData from '../dummyData'
import Context from '../Context';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const testContext = {
    allGamesData: dummyData[0].games
  }
  ReactDOM.render(
    <Context.Provider value={testContext}>
      <MemoryRouter>
      <MyGames />
    </MemoryRouter>
    </Context.Provider>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
