import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import profile from './images/user.jpg';
import email from './images/email.jpg';
import password from './images/password.png';
import swal from 'sweetalert';
import extractErrorCode from './errorMessage';
const Login = ({ web3Handler, account, swms }) => {
  const [user, setUser] = useState({
    id: '',
    password: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  const loginUser = async () => {
    console.log('In login');
    if (account != null) {
      let isCustomer, isMember, txn;
      try {
        console.log(user.id, user.password);
        isCustomer = await swms.customerAddress(account);
        console.log(isCustomer);
        if (isCustomer) {
          console.log('is customer ', typeof(parseInt(user.id[0],10)),user.password[0]);
          try {
            txn = await swms.loginCustomer(parseInt(user.id[0], 10), user.password[0]);
            console.log("Customer login done ...txn");
            let temp = await swms.customerLoggedIn()
            

          } catch (err) {
            let x = err.message.toString();
            console.log('Error: ', err, "to string", x);
            const errMsg = extractErrorCode(x);
            console.log('Error in registering: ', errMsg);
            swal('Oops!', errMsg, 'error');

          }
        } else {
          isMember = await swms.memberAddress(account);
          console.log('Mem', isMember);

          if (isMember) {
            txn = await swms.loginCommittee(user.id, user.password);

          } else {
            swal(
              'Oops!',
              'You are not Registered in our portal. Kindly Register to Login ',
              'error'
            );
          }
        }

        // wait for transaction

        // console.log(customerId.hash);
        // provider.waitForTransaction(customerId.hash).then(async function (customerId) {
        //   console.log('Transaction Mined: ' + customerId.hash);
        //   console.log(customerId);
        //   cid = await swms.totalCustomers();
        //   cid = parseInt(cid.toHexString(), 16)
        //   swal("Hurray!!", "You are registered successfully ...\n Kindly remeber your id: " + cid, "success")
        //   navigate('/login');
        //   console.log("New id: ", cid);

        // });
      } catch (err) {
        // console.log('Error: ', err);
        const errMsg = extractErrorCode(err.toString());
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

  console.log(user);
  
  return (
    <div>
      <div>
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
            <input placeholder=' example: 243' name='id' onChange={onChange} type='number' />
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
        <div className='text-container'></div>
      </div>
    </div>
  );
};

export default Login;
