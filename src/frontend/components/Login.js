import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import profile from './images/user.jpg';
import email from './images/email.jpg';
import password from './images/password.png';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

import extractErrorCode from './ErrorMessage';
const Login = ({ web3Handler, account, swms,provider }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    password: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  // localStorage.clear(); in useEffect
  const loginUser = async () => {
    localStorage.clear();
    console.log('In login');
    if (account != null) {
      let isCustomer, isMember, txn, id;
      id = parseInt(user.id[0], 10);

      try {
        console.log(id, user.password);
        isCustomer = await swms.customerAddress(account);
        console.log(isCustomer);
        if (isCustomer) {
          console.log(
            'is customer ',
            typeof parseInt(user.id[0], 10),
            user.password[0]
          );
          try {
            // id = parseInt(user.id[0], 10);
            txn = await swms.loginCustomer(id, user.password[0]);
            console.log('Customer login done ...txn');
            let temp = await swms.customerLoggedIn(account);
            console.log(temp);
            swal('Hurray', 'Logged in Successfully', 'success');
            console.log('Customer id: ', id);
            localStorage.setItem('id', id);
            navigate('/customer-home/add-waste');
          } catch (err) {
            extractErrorCode(err);
          }
        } else {
          isMember = await swms.memberAddress(account);
          console.log('Mem', isMember,typeof(user.password[0]));

          if (isMember) {
            txn = await swms.loginMember(id, user.password[0]);
            console.log("done");
            let cid;
            provider
              .waitForTransaction(txn.hash)
              .then(async function (txn) {
                console.log('Transaction Mined: ' + txn.hash);
                console.log(txn);
                let loggedIn = await swms.memberLoggedIn(account);
                console.log(loggedIn);
                swal('Hurray', 'Logged in Successfully', 'success');
                console.log("Member id: ", id)
                localStorage.setItem('id', id);
                navigate('/committee-home/pending-tasks');
                let _cid = await swms.members(id);
                console.log(_cid, typeof cid);
                console.log('Wallet: ', _cid.member, typeof cid);
                // const _name=await swms.members(cid)
                console.log('Name: ', _cid.name, _cid.member);
                console.log('Password: ', _cid.password);
                console.log('Address', _cid.isAvailable);
                console.log('Member id', _cid.customerId);
              });
          } else {
            swal(
              'Oops!',
              'You are not Registered in our portal. Kindly Register to Login ',
              'error'
            );
          }
        }

      } catch (err) {
        // console.log('Error: ', err);
        const errMsg = extractErrorCode(err);
        console.log('Error in registering: ', errMsg);
        swal('Oops!', errMsg, 'error');
      }
    } else {
      // alert('Please connect your metamask account before rgistering.');
      swal(
        'Oops',
        'Please connect your metamask account before registering.',
        'error'
      );
    }
  };

  // const mockDirectToCommitteeHome = () => {
  //   navigate('/committee-home/pending-tasks', { state: { id: '1' } });
  // };
  console.log(user);

  return (
    <div>
      <div className='container'>
        <div className='sign-up'>
          <h1 className='heading'>
            <b>SIGN IN</b>
          </h1>
          {
            // <div className='text'>
            //   <img height='20px' src={profile} />
            //   <input placeholder='Mask Id' type='text' />
            // </div>
          }
          <div className='text'>
            <img height='20px' src={email} />
            <input
              placeholder=' example: 243'
              name='id'
              onChange={onChange}
              type='number'
            />
          </div>
          <div className='text'>
            <img height='30px' src={password} />
            <input
              placeholder=' Password'
              type='password'
              name='password'
              onChange={onChange}
            />
          </div>
          <p></p>
          <button className='button_login' onClick={web3Handler}>
            Connect Wallet
          </button>

          <button className='button_login' onClick={loginUser}>
            LOGIN
          </button>
          <p className='conditions'>
            Don't have an account ? <a href='/register/customer'>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
