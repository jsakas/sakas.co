const requireAll = (r) => r.keys().map(r);
export default requireAll(require.context('@docs/experiments', true, /\.md$/)).sort((a, b) => a.id - b.id);
