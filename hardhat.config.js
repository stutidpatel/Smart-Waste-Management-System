require("@nomiclabs/hardhat-waffle");
// require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contract",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
