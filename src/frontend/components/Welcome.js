import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
  let navigate = useNavigate();

  return (
    <div>
      <body className='body'>
        <header className='header'>
          <div className='wrapper'>
            <div className='logo'>
              <img src='https://i.postimg.cc/mg4rWBmv/logo.png' alt=''></img>
            </div>
            <ul className='nav-area'>
              <li>
                <a href=''>Home</a>
              </li>
              <li>
                <a href=''>About</a>
              </li>
              <li>
                <a
                  href=''
                  onClick={() => {
                    navigate('/register/customer');
                  }}
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href=''
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Sign In
                </a>
              </li>
              <li>
                <a href=''>Contact</a>
              </li>
            </ul>
          </div>
          <div className='welcome-text'>
            <h1>
              Smart Waste Management <span>Portal</span>
            </h1>
          </div>
        </header>
      </body>
    </div>
  );
};
export default Welcome;
