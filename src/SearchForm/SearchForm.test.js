import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import SearchForm from './SearchForm';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    // <MemoryRouter>
      <SearchForm />,
    // </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
