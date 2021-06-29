/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  alias: {
    _api: './src/api',
    _assets: './src/assets',
    _components: './src/components',
    _context: './src/context',
    _helpers: './src/helpers',
    _hooks: './src/hooks',
    _navigation: './src/navigation',
    _templates: './src/templates',
    _theme: './src/theme',
    _types: './src/types',
    _views: './src/views',
  },
  env: {
    HEROES_LOCAL_API_URL: 'http://localhost:5000/api/v1',
    HEROES_API_URL: 'https://heroes-fights.herokuapp.com/api/v1',
  },
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    port: 9000,
  },
  buildOptions: {
    /* ... */
  },
}
