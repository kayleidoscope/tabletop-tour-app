import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import Heading from './Heading';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Heading />,
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
