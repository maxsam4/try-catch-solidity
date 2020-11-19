import "../Token.sol";

contract ProxyToken  is Token  {

      constructor() public  {}
   function test_transfer(address  sender, address  recipient, uint256  amount) public  {
    _transfer(sender,recipient,amount);
   }

   function test_mint(address  account, uint256  amount) public  {
    _mint(account,amount);
   }

   function test_burn(address  account, uint256  value) public  {
    _burn(account,value);
   }

   function test_approve(address  owner, address  spender, uint256  value) public  {
    _approve(owner,spender,value);
   }

   function test_burnFrom(address  account, uint256  amount) public  {
    _burnFrom(account,amount);
   }


}