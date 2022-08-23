require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
   networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/2I2KcIynRuSehVnmIDNqYBkV5d7eW0HR', //your quicknode api
      accounts: ['65d45c167bb569abbcfef0f03bd569a2e681a73f24f5232904a6501ccbfa399e'], //your private account key
    },
  },
};
