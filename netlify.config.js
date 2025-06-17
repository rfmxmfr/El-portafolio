module.exports = {
  build: {
    command: "npm run build",
    publish: "dist",
    environment: {
      NODE_VERSION: "18",
      NPM_FLAGS: "--no-optional"
    }
  }
};