import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomerNavBarStyles.css';

const CustomerNavBar = () => {
  return (
    <div className='body'>
      <nav className='nav'>
        <NavLink to='/' target={'_blank'}>
          Smart Waste Management System
        </NavLink>
        <ul>
          <li>
            <NavLink to='/register/customer'>Add Waste</NavLink>
          </li>
          <li>
            <NavLink to='/register/committee'>History</NavLink>
          </li>
          <li>
            <NavLink to='/register/committee'>Account</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerNavBar;