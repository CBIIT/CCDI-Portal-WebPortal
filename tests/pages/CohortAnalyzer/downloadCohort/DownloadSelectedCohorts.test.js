/**
 * **Download Results** dropdown — **`GET_COHORT_MANIFEST_QUERY`** / **`GET_COHORT_METADATA_QUERY`** via mocked **`graphqlClient`**.
 *
 * @see src/pages/CohortAnalyzer/downloadCohort/DownloadSelectedCohorts.js
 */

jest.mock('../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('../../../../src/pages/inventory/cohortModal/utils', () => ({
  arrayToCSVDownload: jest.fn(),
  objectToJsonDownload: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import client from '../../../../src/utils/graphqlClient';
import {
  arrayToCSVDownload,
  objectToJsonDownload,
} from '../../../../src/pages/inventory/cohortModal/utils';
import DownloadSelectedCohort from '../../../../src/pages/CohortAnalyzer/downloadCohort/DownloadSelectedCohorts';
import { createCohortDownloadClientQueryMock } from '../../../helpers/cohortAnalyzerApiMocks';

describe('DownloadSelectedCohort', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    client.query.mockImplementation(createCohortDownloadClientQueryMock());
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should open menu and download manifest CSV when Manifest CSV is chosen', async () => {
    const queryVariable = { id: ['p1'], first: 12000 };

    render(
      <DownloadSelectedCohort queryVariable={queryVariable} isSelected />,
    );

    fireEvent.click(screen.getByRole('button', { name: /download results/i }));
    fireEvent.click(screen.getByText('Manifest CSV'));

    await waitFor(() => {
      expect(client.query).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: queryVariable,
        }),
      );
    });

    expect(arrayToCSVDownload).toHaveBeenCalled();
    const firstArg = arrayToCSVDownload.mock.calls[0][0];
    expect(firstArg).toEqual(expect.any(Array));
    expect(arrayToCSVDownload.mock.calls[0][1]).toBe('analyzed');
  });

  it('should download metadata JSON when Metadata JSON is chosen', async () => {
    render(
      <DownloadSelectedCohort
        queryVariable={{ id: ['p1'], first: 12000 }}
        isSelected
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /download results/i }));
    fireEvent.click(screen.getByText('Metadata JSON'));

    await waitFor(() => {
      expect(objectToJsonDownload).toHaveBeenCalled();
    });
    expect(objectToJsonDownload.mock.calls[0][1]).toBe('Analyzed');
  });

  it('should not toggle dropdown when isSelected is false', () => {
    render(
      <DownloadSelectedCohort queryVariable={{}} isSelected={false} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /download results/i }));
    expect(screen.queryByText('Manifest CSV')).not.toBeInTheDocument();
  });

  it('should close the dropdown when clicking outside', () => {
    render(
      <div>
        <DownloadSelectedCohort
          queryVariable={{ id: ['p1'], first: 12000 }}
          isSelected
        />
        <button data-testid="outside">outside</button>
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: /download results/i }));
    expect(screen.getByText('Manifest CSV')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Manifest CSV')).not.toBeInTheDocument();
  });

  it('should keep the dropdown open when clicking inside the menu', () => {
    render(
      <DownloadSelectedCohort
        queryVariable={{ id: ['p1'], first: 12000 }}
        isSelected
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /download results/i }));
    const menuItem = screen.getByText('Manifest CSV');
    fireEvent.mouseDown(menuItem);
    // Still open after a mousedown that originated inside the dropdown.
    expect(screen.getByText('Manifest CSV')).toBeInTheDocument();
  });
});
