/**
 * **`getManifestData`** hook — **`client.query`** with **`file_ids`** variables.
 *
 * @see src/pages/cart/customComponent/exportButton/util/TableService.js
 */

jest.mock('../../../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import gql from 'graphql-tag';

import client from '../../../../../../src/utils/graphqlClient';
import { getManifestData } from '../../../../../../src/pages/cart/customComponent/exportButton/util/TableService';

const MANIFEST_QUERY = gql`
  query ManifestRows($file_ids: [String]) {
    cohortManifest {
      guid
    }
  }
`;

function Harness({ filesId }) {
  const { data } = getManifestData(MANIFEST_QUERY, filesId);
  return (
    <div data-testid="out">
      {data ? JSON.stringify(data) : 'pending'}
    </div>
  );
}

describe('TableService getManifestData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }
  });

  it('should call client.query with file_ids and expose response data', async () => {
    client.query.mockResolvedValue({
      data: { cohortManifest: [{ guid: 'g1' }] },
    });

    render(<Harness filesId={['id1', 'id2']} />);

    await waitFor(() => {
      expect(screen.getByTestId('out')).toHaveTextContent('cohortManifest');
    });

    expect(client.query).toHaveBeenCalledWith({
      query: MANIFEST_QUERY,
      variables: {
        file_ids: ['id1', 'id2'],
      },
    });
  });
});
