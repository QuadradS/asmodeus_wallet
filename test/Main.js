const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Main", function () {
    let acc1
    let acc2
    let main
    const provider = ethers.provider;

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

    it('should deposit 1 ether', async function () {
        const transferValue = ethers.utils.parseEther('1');

        await main.setUser(ethers.utils.formatBytes32String('quadrad_2'), acc2.address);
        await main.connect(acc2).deposit({value: transferValue});

        const balance = await main.userBalance(acc2.address);
        expect(balance.toString()).to.equal(transferValue);
    });

    it('should transfer 1 ether from acc2 to acc1', async function () {
        const transferValue = ethers.utils.parseEther('1');
        await main.setUser(ethers.utils.formatBytes32String('quadrad_2'), acc2.address);
        await main.connect(acc2).deposit({value: transferValue});
        await main.connect(acc2).transfer(acc1.address, transferValue);

        const balance = await main.userBalance(acc1.address);
        expect(balance.toString()).to.equal(transferValue);
    });

    // TODO not finished
    it('should withdraw 1 ether from acc2 to acc1', async function () {
        const withdrawValue = ethers.utils.parseEther('1');
        const depositValue = ethers.utils.parseEther('5');

        await main.setUser(ethers.utils.formatBytes32String('quadrad_2'), acc2.address);
        await main.connect(acc2).deposit({value: depositValue});
        await main.connect(acc2).withdraw({value: withdrawValue});
        const balance = main.userBalance(acc2.address);
        const acc2Balance = await provider.getBalance(acc2.address);
        const contractBalance = await provider.getBalance(main.address);



        console.log('cost ', contractBalance, acc2Balance, balance);
       // expect(balance.toString()).to.equal(transferValue);
    });
});
