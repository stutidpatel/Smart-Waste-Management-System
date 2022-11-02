import React, { useState } from 'react';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';

const Customer = () => {
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
      pattern: '[A-Za-z0-9,.]+',
      required: true,
    },
    {
      id: 'addressL2',
      name: 'addressL2',
      type: 'text',
      placeholder: 'Address Line Two',
      errorMessage: 'Address is not valid.',
      label: 'Address Line Two',
      pattern: '[A-Za-z0-9,.]*',
      required: false,
    },
    {
      id: 'password',
      name: 'password',
      type: 'text',
      placeholder: 'Paswsword',
      errorMessage:
        'The password should be 8 to 20 characters and should have atleast 1 number, 1 special character, 1 alphabet',
      pattern:
        `^(?=.*[a-zA-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd][A-Za-zd!@#$%^&*()_+]{8,20}$`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: [e.target.value] });
  };

  // console.log(customer);

  return (
    <div className='divForm'>
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
