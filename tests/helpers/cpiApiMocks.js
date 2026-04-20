/**
 * Mock `global.fetch` for CPI participant statistics (`/v1/statistic`).
 * Use with fixtures from tests/fixtures/resource/cpiResourceFixtures.js.
 */

export function createCpiStatsFetchSuccessMock(statsBody) {
  return jest.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(statsBody),
    }),
  );
}

/** Non-200 response → controller sets cpiStatsError and view shows unavailable message. */
export function createCpiStatsFetchHttpErrorMock(status = 503) {
  return jest.fn(() =>
    Promise.resolve({
      status,
      ok: false,
      json: () => Promise.resolve({}),
    }),
  );
}
