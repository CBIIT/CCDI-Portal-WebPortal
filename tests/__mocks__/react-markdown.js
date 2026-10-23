// react-markdown v8 is pure ESM and cannot be parsed by Jest 23's babel-jest
// (which ignores node_modules). Render children verbatim so components that
// embed markdown can mount in tests without loading the real ESM module.
const React = require('react');

const ReactMarkdown = ({ children }) => React.createElement(
  'div',
  { 'data-testid': 'mock-react-markdown' },
  children,
);

module.exports = ReactMarkdown;
module.exports.default = ReactMarkdown;
module.exports.__esModule = true;
module.exports.uriTransformer = (uri) => uri;
