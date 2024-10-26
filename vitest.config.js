import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        enabled: true,
        provider: 'istanbul',
        reporter: ['text', 'json', 'html', 'lcov', 'cobertura'],
        include: [
          '**/*.vue',
          '**/*.js',
        ],
        exclude: [
          '**/node_modules/**',
          '**/dist/**',
          '**/cypress/**',
          '**/.{idea,git,cache,output,temp}/**',
          '**/*.{test,spec}.?(c|m)[jt]s?(x)',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
          'e2e/**',
          'src/main.js'
        ],
        reportsDirectory: './coverage',
      },
    }
  })
)
