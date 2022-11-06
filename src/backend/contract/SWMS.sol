
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
contract SWMS {
    uint public totalCustomers;
    uint public totalMembers;
    uint minWeight=300;
    struct Customer{
        string name;
        uint customerId;
        address payable customer;
        string customerAddress; 
        string password;
        uint weight; // in grams
        uint memberId;
    }

    struct CommitteeMember {
        string name;
        uint memberId;
        address payable member;
        string password;
        uint256 contactNumber;
        bool isAvailable;
        uint customerId;

    }
    // store by id
    mapping(uint=>Customer) public customers;
    mapping(uint=>CommitteeMember) public members;

    // used address
    mapping(address=>bool) public customerAddress;
    mapping(address=>bool) public memberAddress;

    // Login activity
    mapping(address=>bool) public customerLoggedIn;
    mapping(address=>bool) public memberLoggedIn;

    //queue
    mapping(uint => uint) collectionQueue;
    uint public firstQueue = 1;
    uint public lastQueue = 0;

    // "Taha","Nirma Uni","kj123@"
    function registerCustomer(string memory _name, string memory _customerAddress, string memory _password) public returns (uint){
        require(!doesAddressExists(payable(msg.sender)), "Please use another address");

        totalCustomers++;
        customers[totalCustomers]=Customer(
            _name,
            totalCustomers,
            payable(msg.sender),
            _customerAddress,
            _password,
            0,
            0
        
        );
        customerAddress[msg.sender]=true;
        console.log("Customer Id: ",totalCustomers);
        return totalCustomers;

    }
     // For committee members
    function registerCommittee(string memory _name, uint256 _contactNumber, string memory _password) public returns (uint){
        // check for uniqueness of wallet address
        require(!doesAddressExists(payable(msg.sender)), "__Please use another address. Address is registered.__");

        totalMembers++;
        members[totalMembers]=CommitteeMember(
            _name,
            totalMembers,
            payable(msg.sender),
            _password,
            _contactNumber,
            true,
            0
        );
        memberAddress[msg.sender]=true;
        console.log("Member Id: ",totalMembers);
        // if customer is waiting for member
        if(lastQueue>=firstQueue){
            console.log("In if..");
            assignMember(totalMembers);
        }
        return totalMembers;
    }

    // customer registered
    function customerExists(uint _customerId) public view returns (bool) {
        if(customers[_customerId].customer==msg.sender){
            // console.log("Customer is registered with this acc");
            return true;
        }
      
        console.log("Customer not registered");
        return false;

    } 
    // id matches the psw
    function isValidCustomer(uint _customerId,string memory _password) public view returns (bool){
        if(keccak256(abi.encodePacked(customers[_customerId].password))== keccak256(abi.encodePacked(_password))){
            return true;
        }
        return false;
    }

    function loginCustomer(uint _customerId, string memory _password)  public returns (bool){
        //customer not registered
        require(customerExists(_customerId),"Customer not registered with this account");

        // customer credential invalid
        require(isValidCustomer(_customerId,_password),"Invalid credentials");

        // require(false,"Login Successful");
        console.log("Successful login!");
        customerLoggedIn[msg.sender]=true;
        return true;
    }
    

    function doesAddressExists(address userAddress) internal view returns  (bool) {
        console.log(userAddress);
        return customerAddress[userAddress] || memberAddress[userAddress];
    }

   
    // registered or not
    function memberExists(uint _memberId) public view returns (bool) {
        // member address has this
        if(members[_memberId].member== msg.sender){
            return true;
        }
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

    function loginMember(uint _memberId, string memory _password)  public returns (bool){
        //member not registered
        require(memberExists(_memberId),"member not registered");

        // member credential invalid
        require(isValidmember(_memberId,_password),"Invalid credentials");

        console.log("Login Successful");
        memberLoggedIn[msg.sender]=true;

        return true;
    }

    function addWaste(uint _customerId,uint _weight) public{
        require(customerLoggedIn[msg.sender],"Log in to add waste");
        customers[_customerId].weight += _weight;
    }
    function collectWaste(uint _customerId) public returns (uint){
        require(customerLoggedIn[msg.sender],"Log in to collect waste");

        uint _memberId=findAvailableMember();
        if(_memberId==0){
            console.log("No member is currently available");

            // if enough waste enqueue customer
            if(customers[_customerId].weight >= minWeight){
                lastQueue += 1;
                collectionQueue[lastQueue] = _customerId;
            }else{
                console.log("Member will assigned after reaching the min val");
            }
            return 0; //no member available
        }


        // member is notified to collect waste
        if(customers[_customerId].weight >= minWeight){
            notifyMember(_memberId,_customerId);
            customers[_customerId].memberId=_memberId;
            console.log("Member updated");
            // member is updated;
            return 1;
        }
        // not enough waste
        console.log("Not enough waste");
        return 2;
    
    }
    function notifyMember(uint _memberId,uint _customerId) internal{
        members[_memberId].customerId=_customerId;
    }
    function findAvailableMember() public view returns (uint){

        for(uint i=1; i <= totalMembers; i++){
            if(members[i].isAvailable== true)
                return i;
        }
        // no available committee members
        return 0;
    }

    function assignMember(uint _memberId) internal {
        uint _customerId=collectionQueue[firstQueue];
        members[_memberId].customerId = _customerId;
        members[_memberId].isAvailable=false;

        customers[_customerId].memberId=_memberId;
        console.log("Customer ", _customerId);
        console.log(" is assigned Member ",_memberId);

        delete collectionQueue[firstQueue];
        firstQueue += 1;
    }
    // member function to update that waste is collected
    function updateWasteCollected(uint _memberId,uint _customerId) public{
        require(memberLoggedIn[msg.sender],"Member kindly loggin first");
        customers[_customerId].weight=0; // waste collected
        customers[_customerId].memberId=0; // assigned member

        members[_memberId].isAvailable=true; 
        members[_memberId].customerId=0;
        // asign from queue and dequeue
        if(lastQueue>=firstQueue){
            assignMember(_memberId); // no need to find as we know that the member is available
        }


    }
    function payCustomer(uint eths)public{
        
    }

}
// add categories
// add logout
 
