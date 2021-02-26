import { loader } from 'webpack';

const cssToJsLoader = require.resolve('./cssToJsLoader');

module.exports = function TestLoader(this: loader.LoaderContext, source: string | Buffer) {
  const callback = this.async();
  if (this.cacheable) {
    this.cacheable();
  }

  // FIXME:
  if (source.toString().includes(`import styles from './MainSection.css';`)) {
    callback!(
      null,
      source
        .toString()
        .replace('./MainSection.css', `./MainSection.css.js!=!${cssToJsLoader}!./MainSection.css`),
    );
    return;
  }

  callback!(null, source);
};
