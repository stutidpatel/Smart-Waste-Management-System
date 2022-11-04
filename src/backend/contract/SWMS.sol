
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract SWMS {
    uint public totalCustomers;
    uint public totalMembers;

    struct Customer{
        string name;
        uint customerId;
        address payable customer;
        string customerAddress; 
        string password;
    }

    struct CommitteeMember {
        string name;
        uint memberId;
        address payable member;
        string password;
        uint256 contactNumber;
    }

    mapping(uint=>Customer) public customers;
    mapping(uint=>CommitteeMember) public members;
    mapping(address=>bool) public customerAddress;
    mapping(address=>bool) public memberAddress;

    // "Taha","Nirma Uni","kj123@"
    function registerCustomer(string memory _name, string memory _customerAddress, string memory _password) public returns (uint){
        // require(!checkUniquenessOfAddressInSystem(payable(msg.sender)), "Please use another address");

        totalCustomers++;
        customers[totalCustomers]=Customer(
            _name,
            totalCustomers,
            payable(msg.sender),
            _customerAddress,
            _password
        
        );
        console.log("In sol",totalCustomers);
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

        // require(false,"Login Successful");
        return true;
    }
    function payCustomer(uint eths)public{
        
    }

    function checkUniquenessOfAddressInSystem(address userAddress) internal returns (bool) {
        return customerAddress[userAddress] || memberAddress[userAddress];
    }

    // For committee members
    function registerCommittee(string memory _name, uint256 _contactNumber, string memory _password) public returns (uint){
        // check for uniqueness of wallet address
        require(!checkUniquenessOfAddressInSystem(payable(msg.sender)), "Please use another address");

        totalMembers++;
        members[totalMembers]=CommitteeMember(
            _name,
            totalMembers,
            payable(msg.sender),
            _password,
            _contactNumber
        );
        return totalMembers;
    }

    function memberExists(uint _memberId) public view returns (bool) {
        // if unintialised then name will be empty
        if(bytes(members[_memberId].name).length > 0){
            return true;
        }
        return false;
    }
     
    function isValidmember(uint _memberId,string memory _password) public view returns (bool){
        if(keccak256(abi.encodePacked(members[_memberId].password))== keccak256(abi.encodePacked(_password))){
            return true;
        }
        return false;
    }

    function loginmember(uint _memberId, string memory _password) view public returns (bool){
        //member not registered
        require(memberExists(_memberId),"member not registered");

        // member credential invalid
        require(isValidmember(_memberId,_password),"Invalid credentials");

        // require(false,"Login Successful");
        return true;
    }

}
