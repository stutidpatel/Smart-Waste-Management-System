import React, { useState } from 'react';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('here');
    // console.log('HandleSubmit 2 ', account, swms);
    if (account != null) {
      const temp = customer.addressL1 + ' ' + customer.addressL2;
      console.log('Address', temp);
      const customerId = await swms.registerCustomer(
        customer.fullName.toString(),
        temp.toString(),
        customer.password.toString()
      );
      console.log('Customer id: ', customerId);
    } else {
      alert('Please connect your account before rgistering.');
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
      <form className='registrationForm' onSubmit={handleSubmit}>
        <h1 className='formHeader'>Customer Registration</h1>
        {inputs.map((input) => (
          <RegistarationFormInput
            key={input.id}
            {...input}
            value={customer[input.name]}
            onChange={onChange}
          />
        ))}
        <button className='submitButton' type='button' onClick={web3Handler}>
          Connect the account
        </button>
        <button className='submitButton' type='submit'>
          Register as a customer
        </button>
        <button className='submitButton' type='button' onClick={checkCust}>
          Find My Details
        </button>
      </form>
    </div>
  );
};

export default Customer;
