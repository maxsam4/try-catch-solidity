const Example = artifacts.require('Example.sol');

contract("Try Catch", async (accounts) => {
    let exampleContract;

    before(async () => {
        exampleContract = await Example.deployed();
    });


    it("Should not completely revert even if transferFrom reverts", async () => {
        let initialAmount = await exampleContract.lastAmount();
        assert.equal(initialAmount.toNumber(), 0);
        let returnData = await exampleContract.tryTransferFrom.call(accounts[0], accounts[1], 1000);
        assert.equal(returnData[0], false);
        assert.equal(returnData[1].toNumber(), 0);
        let tx = await exampleContract.tryTransferFrom(accounts[0], accounts[1], 1000);
        let finalAmount = await exampleContract.lastAmount();
        assert.equal(finalAmount.toNumber(), 1000);
        assert.equal(tx.logs[0].args._amount.toNumber(), 1000);
    });

    it("Should return proper data if transferFrom succeeds", async () => {
        let returnData = await exampleContract.tryTransferFrom.call(accounts[0], accounts[0], 0);
        assert.equal(returnData[0], true);
        assert.equal(returnData[1].toNumber(), 0);
    });
});
