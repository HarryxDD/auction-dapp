require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:__dirname+'/.env'})

const INFURA_API_KEY = process.env.INFURA_API_KEY
const PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
