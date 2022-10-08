const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Main", function () {
    let acc1
    let acc2
    let main

    const ownerAccountName = ethers.utils.formatBytes32String('QUADARD');

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
        expect(ethers.constants.AddressZero).to.equal(user.wallet);

        await main.setUser(ethers.utils.formatBytes32String('quadrad_2'), acc2.address);
        user = await main.users(acc2.address);
        expect(user.wallet).to.equal(acc2.address);
    });

    it('should deposit 1000 tokens', async function () {
        await main.setUser(ethers.utils.formatBytes32String('quadrad_2'), acc2.address);
        await main.connect(acc2).deposit(1000);

        const balance = await main.userBalance(acc2.address);
        expect(balance.toString()).to.equal('1000');
    });


});
