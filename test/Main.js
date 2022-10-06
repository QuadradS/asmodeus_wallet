const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Main", function () {
    let acc1
    let acc2
    let main

    const ownerAccountName = 'QUADARD';

    beforeEach(async () => {
        [acc1, acc2] = await ethers.getSigners();
        const Main = await ethers.getContractFactory('Main');
        main = await Main.deploy(ownerAccountName);
        await main.deployed();
    })

    it('should check contract\'s owner', async function () {
        const owner = await main.owner();
        expect(acc1.address).to.equal(owner);
    });

    it('should create and check owner\' account', async function () {
        const ownerAccount = await main.ownerAccount();
        expect(acc1.address).to.equal(ownerAccount?.wallet);
        expect(ownerAccountName).to.equal(ownerAccount?.name);
    });

    it('should create another user account', async function () {
        let user = await main.users(acc1.address);
        expect('0x0000000000000000000000000000000000000000').to.equal(user.wallet);

        await main.setUser('quadrad_2', acc2.address);
        user = await main.users(acc2.address);
        expect(user.wallet).to.equal(acc2.address);
    });


});
