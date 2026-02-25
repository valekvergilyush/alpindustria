export const PRODUCTION = process.env.NODE_ENV == 'production'; // eslint-disable-line
export const JS_MINIFY = process.env.JS_MINIFY !== 'false';

export const hmrEnabled = true;

export const shouldCompressImages = PRODUCTION;
