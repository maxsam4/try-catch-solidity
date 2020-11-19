const truffleAssert = require('truffle-assertions');
const Example = artifacts.require('Example');
const SafeMath = artifacts.require('SafeMath');
const Token = artifacts.require('Token');
const ProxySafeMath = artifacts.require('ProxySafeMath');

contract('contractProxySafeMath', (accounts) => {
  let contractProxySafeMath = null;
  let trace = false;
  let contractSafeMath = null;
  let contractToken = null;
  let contractExample = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if (trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Token.link('SafeMath', contractSafeMath.address);
    contractToken = await Token.new({from: accounts[0]});
    if (trace) console.log('SUCESSO: Token.new({from:accounts[0]}');
    contractExample = await Example.new(contractToken.address, {
      from: accounts[0],
    });
    if (trace)
      console.log(
        'SUCESSO: Example.new(contractToken.address,{from:accounts[0]}',
      );
    ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({from: accounts[0]});
  });

  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testsub(1337, 1338, {from: accounts[0]}),
      'revert',
    );
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testdiv(1, 0, {from: accounts[0]}),
      'revert',
    );
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testmod(0, 0, {from: accounts[0]}),
      'revert',
    );
  });
});
