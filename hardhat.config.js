require("@nomiclabs/hardhat-waffle");

const INFURA_API_KEY = "";

const ROPSTEN_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.4",
  // networks: {
  //   ropsten: {
  //     url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
  //     accounts: [`${ROPSTEN_PRIVATE_KEY}`]
  //   }
  // },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
