const Token = artifacts.require('Token.sol');
const Example = artifacts.require('Example.sol');

module.exports = function (deployer, network, accounts) {
  return deployer.deploy(Token)
  .then(() => {
    return deployer.deploy(Example, Token.address);
  })
}
