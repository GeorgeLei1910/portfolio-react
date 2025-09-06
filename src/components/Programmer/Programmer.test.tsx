import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Programmer from './Programmer';

describe('<Programmer />', () => {
  test('it should mount', () => {
    render(<Programmer />);

    const programmer = screen.getByTestId('Programmer');

    expect(programmer).toBeInTheDocument();
  });
});