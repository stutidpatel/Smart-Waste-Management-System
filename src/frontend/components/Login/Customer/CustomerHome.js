import React from 'react';
import { Outlet } from 'react-router';
import CustomerNavBar from './CustomerNavBar';

const CustomerHome = ({ account, swms, provider }) => {
  return (
    <div>
      <CustomerNavBar />
      <Outlet />
    </div>
  );
};

export default CustomerHome;
