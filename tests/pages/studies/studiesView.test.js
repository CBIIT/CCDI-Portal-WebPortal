import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';
import StudiesView from '../../../src/pages/studies/studiesView';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(),
}));

jest.mock('@bento-core/paginated-table', () => ({
  TableView: jest.fn((props) => (
    <div data-testid="table-view-stub">
      {`rows:${props.tblRows.length};total:${props.totalRowCount};server:${String(props.server)}`}
    </div>
  )),
}));

jest.mock('../../../src/pages/studies/tableConfig/Column', () => ({
  configColumn: jest.fn((cols) => cols),
}));

describe('StudiesView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    useApolloClient.mockReturnValue({
      query: jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            studiesListing: [
              { study_id: 'phs001', study_name: 'Study One', num_of_files: 10 },
            ],
          },
        })
        .mockResolvedValueOnce({
          data: { numberOfStudies: 1 },
        }),
    });
  });

  it('should show loading then render table with fetched studies', async () => {
    render(<StudiesView />);

    expect(screen.getByText('Loading studies...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('table-view-stub')).toBeInTheDocument();
    });
    expect(screen.getByText('rows:1;total:1;server:false')).toBeInTheDocument();
    expect(screen.getAllByText('Studies').length).toBeGreaterThan(0);
    expect(screen.getByAltText('study icon')).toBeInTheDocument();
  });

  it('should handle query failure and still render table shell', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    useApolloClient.mockReturnValue({
      query: jest.fn().mockRejectedValue(new Error('failed')),
    });

    render(<StudiesView />);

    await waitFor(() => {
      expect(screen.getByTestId('table-view-stub')).toBeInTheDocument();
    });
    expect(errorSpy).toHaveBeenCalled();
    expect(screen.getByText('rows:0;total:0;server:false')).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
