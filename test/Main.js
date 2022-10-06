const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Main", function () {
    let acc1
    let acc2
    let main

    beforeEach(async () => {
        [acc1, acc2] = await ethers.getSigners();
        const Main = await ethers.getContractFactory('Main');
        main = await Main.deploy();
        await main.deployed();
    })

    it('should check contract\'s owner', async function () {
        const owner = await main.owner();
        expect(acc1.address).to.equal(owner);
    });


});
