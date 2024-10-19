import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: { index: './src/main.tsx' },
  },
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },

  // The following configuration is not necessary as Rsbuild supports audio files by default
  // But you can keep it if you want to be explicit
  // module: {
  //   rules: [
  //     {
  //       test: /\.mp3$/,
  //       type: 'asset/resource',
  //     },
  //   ],
  // },
});
