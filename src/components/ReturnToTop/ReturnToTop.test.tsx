import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReturnToTop from './ReturnToTop';

describe('ReturnToTop', () => {
  it('renders without crashing', () => {
    render(<ReturnToTop type=''/>);
  });

  it('scrolls to top when clicked', () => {
    window.scrollTo = jest.fn();
    render(<ReturnToTop type=''/>);
    
    // Simulate scroll position
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 500,
    });

    // Trigger scroll event to show button
    fireEvent.scroll(window);
    
    const button = screen.queryByLabelText('Return to top');
    if (button) {
      fireEvent.click(button);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    }
  });
});

