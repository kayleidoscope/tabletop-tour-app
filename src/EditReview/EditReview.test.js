import React from 'react';
import ReactDOM from 'react-dom';
// import {MemoryRouter} from 'react-router-dom';
import EditReview from './EditReview';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    // <MemoryRouter>
      <EditReview />,
    // </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
