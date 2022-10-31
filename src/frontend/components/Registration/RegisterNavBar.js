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
            <NavLink to='/register/student'>Customer Registration</NavLink>
          </li>
          <li>
            <NavLink to='/register/company'>Orgnanisation Registration</NavLink>
          </li>
          <li>
            <NavLink to='/register/faculty'>Commietee Registration</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RegisterNavBar;
