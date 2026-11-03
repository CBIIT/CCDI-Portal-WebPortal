// Manual mock for axios.
//
// axios 1.x is a dual ESM/CJS package whose default export does not automock
// cleanly under Jest 23, so `jest.mock('axios')` leaves `axios.get` undefined.
// Tests stub the HTTP verb helpers, so expose them explicitly as mock functions.
const mockAxios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  head: jest.fn(() => Promise.resolve({ data: {} })),
  request: jest.fn(() => Promise.resolve({ data: {} })),
};

mockAxios.create = jest.fn(() => mockAxios);

module.exports = mockAxios;
module.exports.default = mockAxios;
