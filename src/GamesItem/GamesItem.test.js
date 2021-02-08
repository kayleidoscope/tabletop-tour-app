import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import GamesItem from './GamesItem';
import dummyData from '../dummyData'
import Context from '../Context'

it('renders without crashing', () => {
  const div = document.createElement('div');


  ReactDOM.render(
    <MemoryRouter>
      <GamesItem gameInfo={dummyData[0].games[0]} myData={dummyData[0].users_games[0]}/>,
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
