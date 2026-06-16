/**
 * Redux store singleton — `injectReducer` and dev vs production middleware wiring.
 */

const mockReplaceReducer = jest.fn();
const mockStoreInstance = {
  replaceReducer: mockReplaceReducer,
  dispatch: jest.fn(),
  getState: jest.fn(),
};

const mockCreateStore = jest.fn(() => mockStoreInstance);
const mockCombineReducers = jest.fn((reducers) => {
  const combined = jest.fn((state = {}, action) => state);
  combined.reducerMap = reducers;
  return combined;
});
const mockApplyMiddleware = jest.fn((...middlewares) => (createStore) => createStore(...middlewares));
const mockComposeWithDevTools = jest.fn((middleware) => middleware);
const mockCreateLogger = jest.fn(() => jest.fn());

jest.mock('redux', () => ({
  createStore: (...args) => mockCreateStore(...args),
  applyMiddleware: (...args) => mockApplyMiddleware(...args),
  combineReducers: (...args) => mockCombineReducers(...args),
}));

jest.mock('redux-thunk', () => jest.fn(() => 'thunk-middleware'));
jest.mock('redux-logger', () => ({
  createLogger: () => mockCreateLogger(),
}));
jest.mock('redux-devtools-extension', () => ({
  composeWithDevTools: (middleware) => mockComposeWithDevTools(middleware),
}));

jest.mock('@bento-core/facet-filter', () => ({
  sideBarReducerGenerator: () => ({ statusReducer: (state = {}) => state }),
}));
jest.mock('@bento-core/cart', () => ({
  cartReducerGenerator: () => ({ cartReducer: (state = {}) => state }),
}));
jest.mock('@bento-core/local-find', () => ({
  LocalFindReducerGenerator: () => ({ localFind: (state = {}) => state }),
}));
jest.mock('../../src/components/Layout/LayoutState', () => (state = {}) => state);
jest.mock('../../src/components/Stats/StatsState', () => (state = {}) => state);
jest.mock('../../src/components/Inventory/InventoryState', () => (state = {}) => state);

describe('store index', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    jest.clearAllMocks();
    jest.resetModules();
  });

  function loadStore(nodeEnv) {
    process.env.NODE_ENV = nodeEnv;
    jest.resetModules();
    // eslint-disable-next-line global-require
    return require('../../src/store').default;
  }

  describe('Store creation', () => {
    it('should create store with devtools and logger in development', () => {
      loadStore('development');

      expect(mockCreateStore).toHaveBeenCalledTimes(1);
      expect(mockComposeWithDevTools).toHaveBeenCalled();
      expect(mockCreateLogger).toHaveBeenCalled();
      expect(mockCombineReducers).toHaveBeenCalledWith(
        expect.objectContaining({
          layout: expect.any(Function),
          stats: expect.any(Function),
          inventoryReducer: expect.any(Function),
        }),
      );
    });

    it('should create store without devtools compose in production', () => {
      loadStore('production');

      expect(mockCreateStore).toHaveBeenCalledTimes(1);
      expect(mockComposeWithDevTools).not.toHaveBeenCalled();
      expect(mockApplyMiddleware).toHaveBeenCalled();
    });
  });

  describe('injectReducer', () => {
    it('should register a dynamic reducer and replace the root reducer', () => {
      const store = loadStore('test');
      const dynamicReducer = (state = { count: 0 }) => state;

      store.injectReducer('dynamicSlice', dynamicReducer);

      expect(mockReplaceReducer).toHaveBeenCalledTimes(1);
      const lastCombineCall = mockCombineReducers.mock.calls[mockCombineReducers.mock.calls.length - 1][0];
      expect(lastCombineCall.dynamicSlice).toBe(dynamicReducer);
      expect(lastCombineCall.stats).toBeDefined();
    });
  });
});
