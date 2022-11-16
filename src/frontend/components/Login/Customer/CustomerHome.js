import React from 'react';
import { Outlet } from 'react-router';
import CustomerNavBar from './CustomerNavBar';

const CustomerHome = () => {
  return (
    <div>
      <CustomerNavBar />
      <Outlet />
    </div>
  );
};

export default CustomerHome;
