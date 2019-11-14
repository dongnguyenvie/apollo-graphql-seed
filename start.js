// Reference by Post: https://www.robinwieruch.de/graphql-apollo-server-tutorial

// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.

global.__basedir = __dirname;

require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// Import the rest of our application.
module.exports = require("./src/index.js");
