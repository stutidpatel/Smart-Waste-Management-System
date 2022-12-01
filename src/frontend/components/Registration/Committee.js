import React, { useState } from 'react';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';

const Committee = () => {
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
      pattern: member.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setMember({ ...member, [e.target.name]: [e.target.value] });
  };

  return (
    <div className='divForm'>
      <form className='registrationForm'>
        <h1 className='formHeader'>Committee Registration</h1>
        {inputs.map((input) => (
          <RegistarationFormInput
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}

        <button className='submitButton' type='button'>
          Connect the account
        </button>
        <button className='submitButton' type='submit'>
          Register as a customer
        </button>
      </form>
    </div>
  );
};

export default Committee;
