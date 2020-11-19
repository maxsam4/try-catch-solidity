const truffleAssert = require('truffle-assertions');
const Example = artifacts.require('Example');
const SafeMath = artifacts.require('SafeMath');
const Token = artifacts.require('Token');
const ProxySafeMath = artifacts.require('ProxySafeMath');
const ProxyToken = artifacts.require('ProxyToken');

contract('contractProxyToken', (accounts) => {
  let contractProxyToken = null;
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
    ProxyToken.link('SafeMath', contractSafeMath.address);
    contractProxyToken = await ProxyToken.new({from: accounts[0]});
  });

  it('Should fail test_transfer(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_transfer(
        '0x0000000000000000000000000000000000000000',
        accounts[2],
        5,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_transfer(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_transfer(
        accounts[6],
        '0x0000000000000000000000000000000000000000',
        5,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_mint(
        '0x0000000000000000000000000000000000000000',
        999,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_burn(
        '0x0000000000000000000000000000000000000000',
        0,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_approve(
        '0x0000000000000000000000000000000000000000',
        accounts[9],
        1338,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_approve(
        accounts[1],
        '0x0000000000000000000000000000000000000000',
        1338,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_burnFrom(
        '0x0000000000000000000000000000000000000000',
        0,
        {from: accounts[5]},
      ),
      'revert',
    );
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractProxyToken.test_burnFrom(
        '0x0000000000000000000000000000000000000000',
        0,
        {from: accounts[5]},
      ),
      'revert',
    );
  });
});
