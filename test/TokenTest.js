const truffleAssert = require('truffle-assertions');
const Example = artifacts.require('Example');
const SafeMath = artifacts.require('SafeMath');
const Token = artifacts.require('Token');
const ProxySafeMath = artifacts.require('ProxySafeMath');

contract('Token', (accounts) => {
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
  });

  it('Should fail transfer(address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.transfer('0x0000000000000000000000000000000000000000', 5, {
        from: accounts[3],
      }),
      'revert',
    );
  });
  it('Should fail approve(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.approve('0x0000000000000000000000000000000000000000', 5, {
        from: accounts[9],
      }),
      'revert',
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.transferFrom(
        '0x0000000000000000000000000000000000000000',
        accounts[5],
        255,
        {from: accounts[9]},
      ),
      'revert',
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.transferFrom(
        accounts[5],
        '0x0000000000000000000000000000000000000000',
        255,
        {from: accounts[9]},
      ),
      'revert',
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.transferFrom(
        '0x0000000000000000000000000000000000000000',
        accounts[5],
        255,
        {from: accounts[9]},
      ),
      'revert',
    );
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.increaseAllowance(
        '0x0000000000000000000000000000000000000000',
        1336,
        {from: accounts[5]},
      ),
      'revert',
    );
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractToken.decreaseAllowance(
        '0x0000000000000000000000000000000000000000',
        1338,
        {from: accounts[1]},
      ),
      'revert',
    );
  });
});
