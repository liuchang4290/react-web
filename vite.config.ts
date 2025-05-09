import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const region = mode.split('-')[0];
  const environment = mode.split('-')[1];

  return {
    plugins: [svgr({ svgrOptions: { icon: true } }), react()],
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
    // 定义环境变量 区域和环境
    define: {
      _GLOBAL_REGION: JSON.stringify(region),
      _GLOBAL_ENV: JSON.stringify(environment),
    },
  };
});
