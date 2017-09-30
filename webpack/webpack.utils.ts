import * as path from 'path';
import {DllReferencePlugin} from 'webpack';
import AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

export function dllReferencePlugins(dlls: string[], context: string) {
  return dlls.reduce((acc, dll) =>
    acc.concat([
      new DllReferencePlugin({
        manifest: path.join(context, `./build/dlls/${dll}/manifest.json`),
        hash: true
      } as any),
      new AddAssetHtmlPlugin(
        {
          filepath: path.join(context, `./build/dlls/${dll}/${dll}.js`),
          includeSourcemap: false,
          hash: true
        } as any)
    ])
  , []);
}
