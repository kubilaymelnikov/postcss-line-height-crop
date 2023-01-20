const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css.replace(/(?:\r\n|\r|\n| )/g, "")).toEqual(
    output.replace(/(?:\r\n|\r|\n| )/g, "")
  );
  expect(result.warnings()).toHaveLength(0);
}

it("does something", async () => {
  await run(
    `
      p {
        line-height-crop: 12 18;
      }
    `,
    `
      p {
        padding: 0.1pt;
      }

      p::before,
      p::after {
        content: '';
        display: block;
        height: 0;
        width: 0;
      }

      p::before {
        margin-top: -0.06em;
      }

      p::after {
        margin-bottom: -0.09em;
      }
    `,
    {}
  );
});
