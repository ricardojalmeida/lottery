pragma solidity ^0.8.11;
contract Lottery {
    address payable public owner; // the address of the owner of the contract
    address payable[] public players; // an array of addresses of the players in the lottery
    uint public fee = 0.1 ether; // the fee required to enter the lottery

    constructor() {
        owner = payable (msg.sender);
        lotteryId = 1;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players; // get the array of addresses of the players in the lottery
    }
    function enter() public payable {
        require(msg.value > fee); // require that the value sent with the transaction is greater than the fee
        // add the address of the player entering the lottery to the array of players
        players.push(payable(msg.sender));
    }

}
