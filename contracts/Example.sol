pragma solidity ^0.5.0;

import "./Token.sol";

/**
 * @dev This contract showcases a simple Try-catch call in Solidity
 */
contract Example {
    Token public token;
    uint256 public lastAmount;

    constructor(Token _token) public {
        token = _token;
    }

    event TransferFromFailed(address _from, uint256 _amount);

    function tryTransferFrom(address _from, address _to, uint256 _amount) public returns(bool returnedBool, uint256 returnedAmount) {
        lastAmount = _amount; // We can query this after transferFrom reverts to confirm that the whole transaction did NOT revert
        // and the changes we made to the state are still present.

        (bool success, bytes memory returnData) =
            address(token).call( // This creates a low level call to the token
                abi.encodePacked( // This encodes the function to call and the parameters to pass to that function
                    token.transferFrom.selector, // This is the function identifier of the function we want to call
                    abi.encode(_from, _to, _amount) // This encodes the parameter we want to pass to the function
                )
            );
        if (success) { // transferFrom completed successfully (did not revert)
            (returnedBool, returnedAmount) = abi.decode(returnData, (bool, uint256));
        } else { // transferFrom reverted. However, the complete tx did not revert and we can handle the case here.
            // I will emit an event here to show this
            emit TransferFromFailed(_from, _amount);
        }
    }
}
