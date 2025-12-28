import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './Page';

describe('<Programmer />', () => {
  test('it should mount', () => {
    render(<Page occupation='programmer'/>);

    const programmer = screen.getByTestId('programmer');

    expect(programmer).toBeInTheDocument();
  });
});