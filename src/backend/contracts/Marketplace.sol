// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    address public highestBidder;
    uint public highestBid;

    struct Item{
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint bids;
        address payable seller;
        bool sold;
    }

    event Offered (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    event Bid(address indexed sender, uint amount);
    event End(address winner, uint amount);

    // itemId -> Item
    mapping(uint => Item) public items;

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price >0, "Price must be greater than zero");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered (
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");

        item.seller.transfer(item.bids);
        feeAccount.transfer(_totalPrice - item.bids);

        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought (
            _itemId,
            address(item.nft),
            item.tokenId,
            item.bids,
            item.seller,
            msg.sender
        );
    }

    function bid(uint _itemId) external payable {

        Item storage item = items[_itemId];

        highestBid = item.bids;
        require(msg.value > highestBid, "value < highest");

        if (highestBidder != address(0)) {
            item.bids += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit Bid(msg.sender, msg.value);
    }

    function end(uint _itemId) external {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(msg.sender == item.seller, "Must be seller");

        if (highestBidder != address(0)) {
            item.seller.transfer(item.bids);
            feeAccount.transfer(_totalPrice - item.bids);

            item.sold = true;
            item.nft.safeTransferFrom(address(this), highestBidder, item.tokenId);

        } else {
            item.nft.safeTransferFrom(address(this), item.seller, item.tokenId);
        }

        emit End(highestBidder, highestBid);
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return (items[_itemId].bids * (100 + feePercent) / 100);
    }
}