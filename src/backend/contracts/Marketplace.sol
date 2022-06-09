// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace is ERC721URIStorage, ReentrancyGuard {

    uint public tokenCount;

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    // address public highestBidder;
    // uint public highestBid;

    mapping(uint => address) public highestBidder;
    mapping(uint => uint) public highestBid;

    struct Item{
        uint itemId;
        uint tokenId;
        uint bids;
        address payable seller;
        bool sold;
    }

    event Offered (
        uint itemId,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought (
        uint itemId,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    event Bid(address indexed sender, uint amount);
    event End(address winner, uint amount);

    // itemId -> Item
    mapping(uint => Item) public items;

    constructor(uint _feePercent) ERC721("Alyx Mystery", "ALX") {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function mint(string memory _tokenURI, uint price) external returns(uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        setApprovalForAll(address(this), true);
        makeItem(tokenCount, price);
        return (tokenCount);
    }

    function makeItem(uint _tokenId, uint _price) public nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        transferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item (
            itemCount,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        //_approve(address(this), tokenCount);

        emit Offered (
            itemCount,
            _tokenId,
            _price,
            msg.sender
        );
    }

    function getCurrentBid(uint _itemId) public view returns (uint256) {
        Item memory item = items[_itemId];
        uint highestBidAmount = item.bids;

        return highestBidAmount;
    }

    function bid(uint _itemId) external payable {

        Item storage item = items[_itemId];

        require(msg.value > getCurrentBid(_itemId) || msg.value > item.bids, "value < highest");


        highestBidder[_itemId] = msg.sender;
        highestBid[_itemId] = msg.value;

        if (highestBidder[_itemId] != address(0)) {
            item.bids = highestBid[_itemId];
        }

        emit Bid(msg.sender, msg.value);
    }

    function end(uint _itemId) external payable {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(msg.sender == item.seller, "Must be seller");

        if (highestBidder[_itemId] != address(0)) {
            payable(item.seller).transfer(item.bids);
            payable(feeAccount).transfer(_totalPrice - item.bids);

            item.sold = true;
            _transfer(address(this), highestBidder[_itemId], item.tokenId);

        } else {
            _transfer(address(this), item.seller, item.tokenId);
        }
        

        emit End(highestBidder[_itemId], highestBid[_itemId]);
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return (items[_itemId].bids * (100 + feePercent) / 100);
    }
}