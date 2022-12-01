import React from 'react';
import { NavLink } from 'react-router-dom';
import './CommitteeNavBarStyle.css';

const CommitteeNavBar = () => {
  return (
    <div className='body'>
      <nav className='nav'>
        <NavLink to='/' target={'_blank'}>
          Smart Waste Management System
        </NavLink>
        <ul>
          <li>
            <NavLink to='/committee-home/pending-tasks'>Pending Tasks</NavLink>
          </li>
          <li>
            <NavLink to='/committee-home/completed-tasks'>History</NavLink>
          </li>
          <li>
            <NavLink to='/committee-home/account'>Account</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CommitteeNavBar;
