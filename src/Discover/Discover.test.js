import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import Discover from './Discover';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    // <MemoryRouter>
      <Discover />,
    // </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
