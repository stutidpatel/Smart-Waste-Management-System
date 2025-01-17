import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
import swal from 'sweetalert';
import extractErrorCode from '../ErrorMessage';

const Customer = ({ web3Handler, account, swms, provider }) => {
  const navigate = useNavigate();
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
      placeholder: 'Password',
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

    // console.log('HandleSubmit 2 ', account, swms);
    if (account != null) {
      const temp = customer.addressL1 + ' \n' + customer.addressL2;
      console.log('Address', temp, account);
      let customerId;
      try {
        customerId = await swms.registerCustomer(
          customer.fullName.toString(),
          temp.toString(),
          customer.password.toString()
        );
        let cid;
        // wait for transaction

        console.log(customerId.hash);
        provider
          .waitForTransaction(customerId.hash)
          .then(async function (customerId) {
            console.log('Transaction Mined: ' + customerId.hash);
            console.log(customerId);
            cid = await swms.totalCustomers();
            cid = parseInt(cid.toHexString(), 16);
            swal(
              'Hurray!!',
              'You are registered successfully ...\n Kindly remeber your id: ' +
                cid,
              'success'
            );
            navigate('/login');
            console.log('New id: ', cid);
            let _cid = await swms.customers(cid);
            console.log(_cid, typeof cid);
            console.log('Wallet: ', _cid.customer, typeof cid);
            // const _name=await swms.customers(cid)
            console.log('Name: ', _cid.name, _cid.customerId);
            console.log('Password: ', _cid.password);
            console.log('Address', _cid.customerAddress);
            console.log('Member id', _cid.memberId);
            console.log('Weight of waste', _cid.weight);
          });
      } catch (err) {
        extractErrorCode(err);
      }
    } else {
      // alert('Please connect your metamask account before rgistering.');
      swal(
        'Oops',
        'Please connect your metamask account before registering.',
        'error'
      );
    }
  };

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: [e.target.value] });
  };
  const checkCust = async (e) => {
    console.log('Customer created ..', swms);
    // try {
    let customerId = await swms.totalCustomers();
    console.log('CID', parseInt(customerId.toHexString(), 16));
    // } catch (err) {
    // console.log(err);
    // console.log("Error in registering: ", extractErrorCode(err.toString()));
    // }
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

// todo
// add nonce too high errror message
