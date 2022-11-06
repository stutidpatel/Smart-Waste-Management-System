import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
import { ethers } from 'ethers';
import { Alert } from 'bootstrap';
const Customer = ({ web3Handler, account, swms }) => {
  const [customer, setCustomer] = useState({
    fullName: '',
    addressL1: '',
    addressL2: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 'fullName',
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
      errorMessage: 'Name should only consist of letters.',
      label: 'Full Name',
      pattern: '[A-Za-z]+ [A-Za-z]+\\s{0,1}[A-Za-z]*',
      required: true,
    },
    {
      id: 'addressL1',
      name: 'addressL1',
      type: 'text',
      placeholder: 'Address Line One',
      errorMessage: 'Address is not valid.',
      label: 'Address Line One',
      pattern: '[A-Za-z0-9,-. ]*',
      required: true,
    },
    {
      id: 'addressL2',
      name: 'addressL2',
      type: 'text',
      placeholder: 'Address Line Two',
      errorMessage: 'Address is not valid.',
      label: 'Address Line Two',
      pattern: '[A-Za-z0-9,-. ]*',
      required: false,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Paswsword',
      errorMessage:
        'The password should be 8 to 20 characters and should have atleast 1 number, 1 special character, 1 alphabet',
      label: 'Paswsword',
      required: true,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords should match',
      label: 'Confirm Password',
      pattern: customer.password,
      required: true,
    },
  ];

  var pot = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/
  );
  const extractErrorCode = (str) => {
    const delimiter = '___'; //Replace it with the delimiter you used in the Solidity Contract.
    const firstOccurence = str.indexOf(delimiter);
    if (firstOccurence == -1) {
      return "An error occured";
    }

    const secondOccurence = str.indexOf(delimiter, firstOccurence + 1);
    if (secondOccurence == -1) {
      return "An error occured";
    }

    //Okay so far
    return str.substring(firstOccurence + delimiter.length, secondOccurence);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('HandleSubmit... ', account, swms);
    console.log('HandleSubmit 2 ', account, swms);
    const temp = customer.addressL1 + ' ' + customer.addressL2;
    console.log('Address', temp);
    let customerId;
    try {
      customerId = await swms.registerCustomer(
        customer.fullName.toString(),
        temp.toString(),
        customer.password.toString()
        );
        console.log('Customer id: ', customerId);
    } catch(err) {
      console.log("Error in registering : ", err)
      console.log("Error ", extractErrorCode(err));
      // alert(extractErrorCode(err))
      
    }
  };

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: [e.target.value] });
  };
  const checkCust = async (e) => {
    console.log('CUstomer created ..', swms);
    let customerId = await swms.totalCustomers();
    console.log('CID', parseInt(customerId, 16));
  };

  // console.log(customer);

  return (
    <div className='divForm'>
      <button className='submitButton' onClick={web3Handler}>
        Connect the account
      </button>
      <button className='submitButton' onClick={checkCust}>
        get cust details
      </button>

      <form onSubmit={handleSubmit} className='registrationForm'>
        <h1 className='formHeader'>Customer Registration</h1>
        {inputs.map((input) => (
          <RegistarationFormInput
            key={input.id}
            {...input}
            value={customer[input.name]}
            onChange={onChange}
          />
        ))}
        <button className='submitButton'>Register as a customer</button>
      </form>
    </div>
  );
};

export default Customer;
