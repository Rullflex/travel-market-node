module.exports = {
  apps: [
    {
      name: 'travel-market',
      script: 'dist/main.js',
      node_args: '-r dotenv-flow/config',
    },
  ],
}
