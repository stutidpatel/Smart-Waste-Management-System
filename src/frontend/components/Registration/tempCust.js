import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
import swal from 'sweetalert';
import { providers } from 'ethers';
import { waitFor } from '@testing-library/react';
import { ethers } from 'hardhat';
// resolve.fallback: { "path": false }
// import { useNavigate } from "react-router-dom"

const Customer = ({ web3Handler, account, swms }) => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        fullName: '',
        addressL1: '',
        addressL2: '',
        pincode: '',
        password: '',
        confirmPassword: '',
    });

    const inputs = [
        {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            placeholder: 'Full Name',
            errorMessage: 'Name should only consist of letters.',
            label: 'Full Name',
            pattern: '[A-Za-z]+ [A-Za-z]+\\s{0,1}[A-Za-z]*',
            required: true,
        },
        {
            id: 'addressL1',
            name: 'addressL1',
            type: 'text',
            placeholder: 'Address Line One',
            errorMessage: 'Address is not valid.',
            label: 'Address Line One',
            pattern: '[A-Za-z0-9,-. ]*',
            required: true,
        },
        {
            id: 'addressL2',
            name: 'addressL2',
            type: 'text',
            placeholder: 'Address Line Two',
            errorMessage: 'Address is not valid.',
            label: 'Address Line Two',
            pattern: '[A-Za-z0-9,-. ]*',
            required: false,
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: 'Paswsword',
            errorMessage:
                'The password should be 8 to 20 characters and should have atleast 1 number, 1 special character, 1 alphabet',
            label: 'Paswsword',
            required: true,
        },
        {
            id: 'confirmPassword',
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errorMessage: 'Passwords should match',
            label: 'Confirm Password',
            pattern: customer.password,
            required: true,
        },
    ];

    var pot = new RegExp(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/
    );
    const extractErrorCode = (str) => {
        // console.log(str);
        const delimiter = '___'; //Replace it with the delimiter you used in the Solidity Contract.
        const firstOccurence = str.indexOf(delimiter);
        if (firstOccurence == -1) {
            return "Nonce value too high. Reset the account";
        }

        const secondOccurence = str.indexOf(delimiter, firstOccurence + 1);
        if (secondOccurence == -1) {
            return "Nonce value too high. Reset the account";
        }

        //Okay so far
        return str.substring(firstOccurence + delimiter.length, secondOccurence);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('here');
        // console.log('HandleSubmit 2 ', account, swms);
        let flag = 0;
        if (account != null) {
            const temp = customer.addressL1 + ' ' + customer.addressL2;
            console.log('Address', temp);


            // let x= await swms.methods.registerCustomer(
            //   customer.fullName.toString(),
            //   temp.toString(),
            //   customer.password.toString()
            // ).send().on('confirmation', (confirmationNumber) => {
            //   console.log("$$", confirmationNumber);
            //   if (confirmationNumber >= 0) {
            //     console.log("Here in confirmation");
            //   }
            // })
            //   .on('error', (error) => {
            //     console.log(error)
            //   })
            // console.log("B$..", await swms.totalCustomers());

            // let x = await swms.methods.registerCustomer(
            //   customer.fullName.toString(),
            //   temp.toString(),
            //   customer.password.toString()
            // );
            // console.log("transaction complete...? ", x)
            // console.log("After ", await swms.totalCustomers());
            // try {
            //   let customerId = await swms.registerCustomer(
            //     customer.fullName.toString(),
            //     temp.toString(),
            //     customer.password.toString()

            //   );
            //   // while(!transactionP)

            //   let cid;
            //   console.log("b4 try catch");
            //   try {
            //     // while (cid == null) {
            //     const provider = new ethers.providers.getDefaultProvider();
            //     cid = provider.waitForTransaction()
            //     // cid = await swms.totalCustomers();
            //     console.log("in while", cid);
            //     // }
            //   } catch (err) {
            //     console.log("Prob in cid");
            //   }


            //   console.log("@@", cid);
            //   swal(cid, "Registered successfully ", "success");
            //   flag = 1;
            //   navigate('/login');


            // } catch (err) {
            //   // console.log('Error: ', err);
            //   if (!flag) {
            //     const errMsg = extractErrorCode(err.toString());
            //     console.log('Error in registering: ', errMsg);
            //     swal("Oops!", errMsg, "error");
            //   }
            // }
        } else {
            swal("Oops", 'Please connect your metamask account before registering.', "error");
            // alert('Please connect your metamask account before rgistering.');
        }
    }

    const onChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: [e.target.value] });
    };
    const checkCust = async (e) => {
        console.log('CUstomer connected ..', swms);
        // try {
        let customerId = await swms.totalCustomers();
        console.log('CID', parseInt(customerId, 16));
        // } catch (err) {
        // console.log(err);
        // console.log("Error in registering: ", extractErrorCode(err.toString()));
        // }
    };

    // console.log(customer);

    return (
        <div className='divForm'>
            <form className='registrationForm' onSubmit={handleSubmit}>
                <h1 className='formHeader'>Customer Registration</h1>
                {inputs.map((input) => (
                    <RegistarationFormInput
                        key={input.id}
                        {...input}
                        value={customer[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className='submitButton' type='button' onClick={web3Handler}>
                    Connect the account
                </button>
                <button className='submitButton' type='submit'>
                    Register as a customer
                </button>
                <button className='submitButton' type='button' onClick={checkCust}>
                    Find My Details
                </button>
            </form>
        </div>
    );
};

export default Customer;
