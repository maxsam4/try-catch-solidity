# try-catch-solidity

This is an example that shows how to do "try catch" in Solidity.

We'll use a low level solidity call to make calls to external function that may or may not revert. If they do revert, we'll handle the case (catch the revert) rather than reverting the whole transaction.

The example calls a function in an external contract but you can use the same trick to do calls to the same contract by calling address(self) instead of address(externalContract).

Read more on https://mudit.blog/try-catch-in-solidity/
