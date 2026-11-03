// remark-gfm v3 is pure ESM; stub it as a no-op plugin. The mocked
// react-markdown ignores plugins, so this only needs to be importable.
const remarkGfm = () => {};

module.exports = remarkGfm;
module.exports.default = remarkGfm;
module.exports.__esModule = true;
