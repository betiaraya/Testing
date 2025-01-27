import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Btm from './btm';

test('renders all navigation links', () => {
  render(<Btm />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Cart')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Account')).toBeInTheDocument();
});

test('clicking Cart calls navigateToCart', () => {
  window.alert = jest.fn(); // Mock the alert function
  render(<Btm />);
  fireEvent.click(screen.getByText('Cart'));
  expect(window.alert).toHaveBeenCalledWith('Navigating to Cart');
});
