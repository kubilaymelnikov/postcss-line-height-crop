/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: "postcss-line-height-crop",
    Declaration: {
      "line-height-crop": (decl) => {
        const round = (_) => Math.round(_ * 10) / 10;

        const selector = decl.parent.selector;
        const values = decl.value
          .split(" ")
          .filter((_) => !!_)
          .filter(parseFloat);

        decl.parent.before(`
          ${selector} {
            padding: 0.1pt;
          }

          ${selector}::before,
          ${selector}::after {
            content: '';
            display: block;
            height: 0;
            width: 0;
          }

          ${selector}::before {
            margin-top: ${round((1 - values[0]) * 0.5)}em;
          }

          ${selector}::after {
            margin-bottom: ${round((1 - values[1]) * 0.5)}em;
          }
        `);

        const parent = decl.parent;

        decl.remove();
        if (!parent.nodes.length) parent.remove();
      },
    },
  };
};

module.exports.postcss = true;
