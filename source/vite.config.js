import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { svgLoader } from './svgLoader.ts';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  // base: process.env.NODE_ENV === "production" ? '/nv-admin/' : '/', //在生产中服务时的基本公共路径 @default '/'
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'application.html'),
      },
      output: {
        // 打包出来不包含文件名，妈都不认最好
        entryFileNames: `assets/[hash].js`,
        chunkFileNames: `assets/[hash].js`,
        assetFileNames: `assets/[hash].[ext]`,
      },
    },
    outDir: path.resolve(__dirname, '../web'),
  },
  server: {
    open: true, // 是否自动在浏览器打开
    proxy: {
      '/vite-proxy': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vite-proxy/, ''),
      },
      '/uploads': {
        target: 'http://localhost:9999/uploads',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ''),
      },
    },
  },
  optimizeDeps: {
    include: ['axios'],
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'), // 键必须以斜线开始
      // 'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  tsconfig: {
    compilerOptions: {
      types: ['vite/client'],
    },
  },
  plugins: [
    vue(),
    svgLoader({ removeSVGTagAttrs: false }),
    copy({
      targets: [
        { src: './config.js', dest: '../web' },
        { src: './avatars', dest: '../web' },
      ],
    }),
  ],
});
