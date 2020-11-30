const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config()

console.log(process.env.MNENOMIC);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: process.env.LOCAL_PORT,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`),
        network_id: 3,
        gas: 4500000,
        gasPrice: 10000000000
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
       version: "^0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
