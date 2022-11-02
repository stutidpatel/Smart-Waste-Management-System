import React from 'react';
import './RegistrationNavBarStyle.css';
import { NavLink } from 'react-router-dom';

const RegisterNavBar = () => {
  let activeStyle = {
    textDecoration: 'underline',
  };
  return (
    <div className='body'>
      <nav className='nav'>
        <NavLink to='/' target={'_blank'}>
          Smart Waste Management System
        </NavLink>
        <ul>
          <li>
            <NavLink to='/register/customer'>Customer Registration</NavLink>
          </li>
          
          <li>
            <NavLink to='/register/committee'>Committee Registration</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RegisterNavBar;
