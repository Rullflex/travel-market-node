module.exports = {
  apps: [
    {
      name: 'travel-market',
      script: 'dist/index.js',
      node_args: '-r dotenv-flow/config',
    },
  ],
}
