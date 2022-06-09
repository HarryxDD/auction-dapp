/* eslint-disable jest/valid-expect */
const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function() {
    let deployer, addr1, addr2, addr3, nft, marketplace
    let feePercent = 1
    let URI = "Sample URI"

    beforeEach(async function() {
        const Marketplace = await ethers.getContractFactory("Marketplace");

        [deployer, addr1, addr2, addr3] = await ethers.getSigners()

        marketplace = await Marketplace.deploy(feePercent);
    });
    
    describe("Deployment", function() {
        it("Should track feeAccount and feePercent of the marketplace", async function() {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        })
    })

    describe("Minting NFTs", function() {
        it("Should track each minted NFT", async function() {
            await marketplace.connect(addr1).mint(URI, 3);
            expect(await marketplace.tokenCount()).to.equal(1);
            expect(await marketplace.tokenURI(1)).to.equal(URI);
        })
    })

    describe("Making marketplace items", function () {


        it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
            await expect(marketplace.connect(addr1).mint(URI, toWei(1)))
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    1,
                    toWei(1),
                    addr1.address
                )

            expect(await marketplace.ownerOf(1)).to.equal(marketplace.address)
            expect(await marketplace.itemCount()).to.equal(1)

            const item = await marketplace.items(1)
            expect(item.itemId).to.equal(1)
            expect(item.tokenId).to.equal(1)
            expect(item.bids).to.equal(toWei(1))
            expect(item.sold).to.equal(false)
        })

        // it("Should fail if price is set to zero", async function () {
        //     await expect (
        //         marketplace.connect(addr1).makeItem(nft.address, 1, 0).to.be.revertedWith("Price must be greater than zero")
        //     )
        // })
    })

    

    describe("Bid an item", function () {
        let price = 2
        let fee = (feePercent/100)*price
        let totalPriceInWei
        beforeEach(async function () {
            await expect(marketplace.connect(addr1).mint(URI, toWei(1)))
        })

        it("Should successfully bid and transfer an item to highest bidder", async function () {
            const sellerInitialEthBal = await addr1.getBalance()

            totalPriceInWei = await marketplace.getTotalPrice(1);

            await expect(marketplace.connect(addr2).bid(1, { value: totalPriceInWei + 1 }))
                .to.emit(marketplace, "Bid")
                .withArgs(
                    addr2.address,
                    totalPriceInWei + 1
                )

            await expect(marketplace.connect(addr3).bid(1, { value: totalPriceInWei + 4 }))
                .to.emit(marketplace, "Bid")
                .withArgs(
                    addr3.address,
                    totalPriceInWei + 4
                )

            await expect(marketplace.connect(addr1).end(1))
                .to.emit(marketplace, "End")
                .withArgs(
                    addr3.address,
                    totalPriceInWei + 4
                )
            
            const sellerFinalEthBal = await addr1.getBalance()

            // Bids will be added to the current price that user set

            expect((await marketplace.items(1)).sold).to.equal(true)
        })
    })
})