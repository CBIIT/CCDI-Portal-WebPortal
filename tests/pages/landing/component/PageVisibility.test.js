import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePageVisibility from '../../../../src/pages/landing/component/PageVisibility';

function Probe() {
  const visible = usePageVisibility();
  return <div>{visible ? 'visible' : 'hidden'}</div>;
}

describe('usePageVisibility', () => {
  it('should return visible by default and update on visibilitychange', () => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      writable: true,
      value: false,
    });

    render(<Probe />);
    expect(screen.getByText('visible')).toBeInTheDocument();

    document.hidden = true;
    fireEvent(document, new Event('visibilitychange'));
    expect(screen.getByText('hidden')).toBeInTheDocument();
  });
});
