
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract SWMS {
    uint public totalCustomers;

    struct Customer{
        string name;
        uint customerId;
        address payable customer;
        string customerAddress; 
        string password;
    }

    mapping(uint=>Customer) public customers;

    // "Taha","Nirma Uni","kj123@"
    function registerCustomer(string memory _name, string memory _customerAddress, string memory _password) public returns (uint){
        totalCustomers++;
        customers[totalCustomers]=Customer(
            _name,
            totalCustomers,
            payable(msg.sender),
            _customerAddress,
            _password
        
        );
        return totalCustomers;

    }
    function customerExists(uint _customerId) public view returns (bool) {
        // if unintialised then name will be empty
        if(bytes(customers[_customerId].name).length > 0){
            return true;
        }
        return false;

    } 
    function isValidCustomer(uint _customerId,string memory _password) public view returns (bool){
        if(keccak256(abi.encodePacked(customers[_customerId].password))== keccak256(abi.encodePacked(_password))){
            return true;
        }
        return false;
    }
    function loginCustomer(uint _customerId, string memory _password) view public returns (bool){
        //customer not registered
        require(customerExists(_customerId),"Customer not registered");

        // customer credential invalid
        require(isValidCustomer(_customerId,_password),"Invalid credentials");

        require(false,"Login Successful");
        return true;
    }
    function payCustomer(uint eths)public{
        
    }


}
