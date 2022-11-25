import React from 'react';
import { Outlet } from 'react-router';
import CommitteeNavBar from './CommitteeNavBar';

const CommitteeHome = () => {
  return (
    <div>
      <CommitteeNavBar />
      <Outlet/>
    </div>
  );
};

export default CommitteeHome;
