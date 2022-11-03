import React, { useState } from 'react';

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
      pattern: member.password,
      required: true,
    },
  ];

  return <div>what man</div>;
};

export default Committee;
