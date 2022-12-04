
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
contract SWMS {
    uint public totalCustomers;
    uint public totalMembers;
    uint minWeight=500;
    struct Order{
        uint weight;
        uint memberId;
        uint customerId;
        uint price;
        // string status; //pending completed
    }
    struct Customer{
        string name;
        uint customerId;
        address payable customer;
        string customerAddress; 
        string password;
        uint totWeight; // in grams that is collected
        // uint memberId;
        Order curOrder;
        // Order[] pastOrders;
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
    Order[] public pastOrders;
    function getPastOrderLength()public view returns(uint){
        return pastOrders.length;
    }
    event AppointedMember(uint memberId,string reason);
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
        require(!doesAddressExists(payable(msg.sender)), "___Please use another address___");
        // Order empty=Order(0,0,0,"");
        totalCustomers++;
        customers[totalCustomers]=Customer(
            _name,
            totalCustomers,
            payable(msg.sender),
            _customerAddress,
            _password,
            0,
            Order(0,0,totalCustomers,0)

        );
        customerAddress[msg.sender]=true;
        console.log("Customer Id: ",totalCustomers);
        return totalCustomers;

    }
     // For committee members
    function registerCommittee(string memory _name, uint256 _contactNumber, string memory _password) public returns (uint){
        // check for uniqueness of wallet address
        require(!doesAddressExists(payable(msg.sender)), "___Please use another address. Address is registered.___");

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
    function customerExists(uint _customerId) internal view returns (bool) {
        if(customers[_customerId].customer==msg.sender){
            // console.log("Customer is registered with this acc");
            return true;
        }
      
        console.log("Customer not registered");
        return false;

    } 
    // id matches the psw
    function isValidCustomer(uint _customerId,string memory _password) internal view returns (bool){
        if(keccak256(abi.encodePacked(customers[_customerId].password))== keccak256(abi.encodePacked(_password))){
            return true;
        }
        return false;
    }

    function loginCustomer(uint _customerId, string memory _password)  public returns (bool){
        //customer not registered
        require(customerExists(_customerId),"___Customer not registered with this account___");

        // customer credential invalid
        require(isValidCustomer(_customerId,_password),"___Invalid credentials___");

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
    function memberExists(uint _memberId) internal view returns (bool) {
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
     
    function isValidmember(uint _memberId,string memory _password) internal view returns (bool){
        if(keccak256(abi.encodePacked(members[_memberId].password))== keccak256(abi.encodePacked(_password))){
            return true;
        }
        return false;
    }

    function loginMember(uint _memberId, string memory _password)  public returns (bool){
        //member not registered
        require(memberExists(_memberId),"___Member not registered___");

        // member credential invalid
        require(isValidmember(_memberId,_password),"___Invalid credentials___");

        console.log("Login Successful");
        memberLoggedIn[msg.sender]=true;

        return true;
    }

    function addWaste(uint _customerId,uint _weight) public{
        require(customerLoggedIn[msg.sender],"___Log in to add waste___");
        // if(compare(customers[_customerId].curOrder.status,"pending"))
            customers[_customerId].curOrder.weight+=_weight;
        // customers[_customerId].totWeight += _weight;
    }
    function collectWaste(uint _customerId) public returns (uint){
        require(customerLoggedIn[msg.sender] && customers[_customerId].customer==msg.sender,"___Log in to collect waste___");
        require(customers[_customerId].curOrder.memberId==0,"___Committee Member appointed Already Appointed___");
        uint _memberId=findAvailableMember();
        if(_memberId==0){
            console.log("No member is currently available");

            // if enough waste enqueue customer
            if(customers[_customerId].curOrder.weight >= minWeight){
                lastQueue += 1;
                collectionQueue[lastQueue] = _customerId;
            }else{
                emit AppointedMember(0,"___Not enough waste___");
                return 2;// not enough waste
                // console.log("Member will assigned after reaching the min val");
            }
            emit AppointedMember(0,"___No member Available currently___");

            return 0; //no member available
        }


        // member is notified to collect waste
        if(customers[_customerId].curOrder.weight >= minWeight){
            notifyMember(_memberId,_customerId);
            customers[_customerId].curOrder.memberId=_memberId;
            console.log("Member updated");
            // member is updated;
            emit AppointedMember(_memberId,"___Committee Member appointed___");

            return 1;
        }
        // not enough waste
        console.log("Not enough waste");
        emit AppointedMember(0,"___Not enough waste___");

        return 2;
    
    }
    function notifyMember(uint _memberId,uint _customerId) internal{
        members[_memberId].customerId=_customerId;
        members[_memberId].isAvailable=false;
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

        customers[_customerId].curOrder.memberId=_memberId;
        console.log("Customer ", _customerId);
        console.log(" is assigned Member ",_memberId);

        delete collectionQueue[firstQueue];
        firstQueue += 1;
    }
   

    function random(uint max) internal view returns(uint) {
        uint seed = uint(keccak256(abi.encodePacked(block.timestamp)));
      
        return seed % max + 1; // 1 and range
    }
    uint[4] public ethPerGram=[0.01 ether,0.012 ether,0.02 ether,0.015 ether];

    function getCurOrderPrice(uint _customerId) public view returns(uint){
        return customers[_customerId].curOrder.price;
    }
    function calcPrice(uint _customerId)public returns(uint){
        uint _weight=customers[_customerId].curOrder.weight;
        uint[4] memory distributedWeights; // from waste segregator
        uint curMax=_weight;
        uint price;
        for(uint i=0;i<3;i++){
            distributedWeights[i]=random(curMax);
            curMax -= distributedWeights[i];
            
            price+=ethPerGram[i]*distributedWeights[i];
            console.log(distributedWeights[i]);
            
        }
        console.log(curMax);
        distributedWeights[3] = curMax;
        price += ethPerGram[3]*distributedWeights[3];
        console.log(price);
        //price
        customers[_customerId].curOrder.price=price;
        return price; 
    }


    // member function to update that waste is collected
    function updateWasteCollected(uint _memberId,uint _customerId,uint _price) internal{
        uint _weight=customers[_customerId].curOrder.weight;
        // uint price=calcPrice(_weight);
        pastOrders.push(Order(_weight,_memberId,_customerId,_price));
        customers[_customerId].totWeight += _weight;

        // empty the cur Order
        customers[_customerId].curOrder=Order(0,0,_customerId,0);


        members[_memberId].isAvailable=true; 
        members[_memberId].customerId=0;
        // asign from queue and dequeue
        if(lastQueue>=firstQueue){
            assignMember(_memberId); // no need to find as we know that the member is available
        }


    }

    function payCustomer(uint _memberId,uint _customerId) public payable{
        require(customers[_customerId].curOrder.memberId==_memberId,"___Already paid___");
        require(members[customers[_customerId].curOrder.memberId].member==msg.sender,"___Not appointed member___");
        require(memberLoggedIn[msg.sender],"___Member kindly loggin first___");
        
        // uint _price=calcPrice(customers[_customerId].curOrder.weight);
        customers[_customerId].customer.transfer(msg.value);
        updateWasteCollected(_memberId,_customerId,msg.value);
    }
}
// add categories
// add logout
 
