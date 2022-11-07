import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bin for delete', () => {
  render(<App />);
  const linkElement = screen.getByText(/🗑️/i);
  expect(linkElement).toBeInTheDocument();
});
