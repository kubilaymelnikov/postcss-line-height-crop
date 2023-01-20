# postcss-line-height-crop

[PostCSS] plugin to crop line-height from text. So that designs can be realized even more accurately..

[PostCSS]: https://github.com/postcss/postcss

```css
  /* Input example */
.foo {
  line-height-crop: 12 18;
}
```

```css
  /* Output example */
.foo {
}
.foo {
  padding: 0.1pt;
}

.foo::before,
.foo::after {
  content: '';
  display: block;
  height: 0;
  width: 0;
}

.foo::before {
  margin-top: -0.06em;
}

.foo::after {
  margin-bottom: -0.09em;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-line-height-crop
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-line-height-crop'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
