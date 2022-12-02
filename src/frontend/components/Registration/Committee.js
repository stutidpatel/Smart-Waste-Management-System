import React, { useState } from 'react';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import extractErrorCode from '../ErrorMessage';

const Committee = ({ web3Handler, account, swms, provider }) => {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    fullName: '',
    contactNumber: '',
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
      id: 'contactNumber',
      name: 'contactNumber',
      type: 'number',
      placeholder: 'Contact Number',
      errorMessage: 'Contact number should only have 10 digits.',
      label: 'Contact Number',
      pattern: '[0-9]{10}',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'The password should be 8 to 20 characters and should have atleast 1 number, 1 special character, 1 alphabet',
      label: 'Password',
      required: true,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords should match',
      label: 'Confirm Password',
      pattern: member.password,
      required: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log('HandleSubmit 2 ', account, swms);
    if (account != null) {
      console.log('Address', account, member.fullName);
      let txn;
      try {

        txn = await swms.registerCommittee(
          member.fullName[0],
          member.contactNumber[0],
          member.password[0]
        );
        let mid;
        // wait for transaction

        console.log(txn.hash);
        provider
          .waitForTransaction(txn.hash)
          .then(async function (txn) {
            console.log('Transaction Mined: ' + txn.hash);
            console.log(txn);
            mid = await swms.totalMembers();
            mid = parseInt(mid.toHexString(), 16);
            swal(
              'Hurray!!',
              'You are registered successfully ...\n Kindly remeber your id: ' +
              mid,
              'success'
            );
            navigate('/login');
            console.log('New id: ', mid);
            let _mid = await swms.members(mid);
            console.log(_mid, typeof mid);
            console.log('Wallet: ', _mid.member, typeof mid);
            // const _name=await swms.customers(mid)
            console.log('Name: ', _mid.name, _mid.customerId);
            console.log('Password: ', _mid.password);
            console.log('Member id', _mid.memberId);
            console.log('Weight of waste', _mid.isAvailable);
          });
      } catch (err) {
        // console.log(err);
        extractErrorCode(err);
      }
    } else {
      // alert('Please connect your metamask account before rgistering.');
      swal("Oops","Please connect your metamask account before registering.","error");
    }
  };

  const onChange = (e) => {
    setMember({ ...member, [e.target.name]: [e.target.value] });
  };

  return (
    <div className='divForm'>
      <form className='registrationForm' onSubmit={handleSubmit}>
        <h1 className='formHeader'>Committee Registration</h1>
        {inputs.map((input) => (
          <RegistarationFormInput
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}

        <button className='submitButton' type='button' onClick={web3Handler}>
          Connect the account
        </button>
        <button className='submitButton' type='submit'>
          Register as a member
        </button>
      </form>
    </div>
  );
};

export default Committee;
