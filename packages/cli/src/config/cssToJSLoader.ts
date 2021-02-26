import { loader } from 'webpack';

module.exports = function CssToJsLoader(this: loader.LoaderContext, source: string | Buffer) {
  const callback = this.async();
  if (this.cacheable) {
    this.cacheable();
  }

  const result = `
    import { css, cx } from 'linaria';
    const filterLink = css\`
      color: inherit;
      margin: 3px;
      padding: 0 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
    \`;

    export default { filterLink };
  `;
  console.log(source.toString(), result);

  callback!(null, result);
};
