import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as ReactRouterDom from 'react-router-dom';
import StudiesDetail from '../../../src/pages/studies/studiesDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('StudiesDetail', () => {
  it('should read studyId from route params and log it', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    ReactRouterDom.useParams.mockReturnValue({ studyId: 'phs123' });

    const { container } = render(<StudiesDetail />);

    expect(logSpy).toHaveBeenCalledWith('phs123');
    expect(container).toBeInTheDocument();
    logSpy.mockRestore();
  });
});
