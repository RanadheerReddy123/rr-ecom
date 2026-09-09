import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

// Grouping test cases using a describe block
describe('React Application Unit Tests', () => {

  test('renders application layout and main title', () => {
    // 1. Render component wrapped in Redux Provider
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // 2. Query DOM element using screen.getByText
    const navHomeLink = screen.getByText(/Home/i);

    // 3. Assert element existence in DOM
    expect(navHomeLink).toBeInTheDocument();
  });

  test('validates navigation bar cart counter presence', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const cartLink = screen.getByText(/Cart \(0\)/i);
    expect(cartLink).toBeInTheDocument();
  });

});