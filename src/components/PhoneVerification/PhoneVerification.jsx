import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { auth } from '../../../src/config/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext'; // Update the path as per your file structure
import './PhoneVerification.css';

const PhoneVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setIsOtpVerified } = useContext(AuthContext); // Use setIsOtpVerified from context

  const phoneNumber = '+919350045349'; // Replace with the actual phone number

  useEffect(() => {
    generateRecaptcha();
    sendCodeToPhoneNumber(phoneNumber);
  }, []);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const sendCodeToPhoneNumber = (phone) => {
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        Swal.fire({
          icon: 'success',
          title: 'Code Sent Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'SMS not sent. Please try again.',
          showConfirmButton: true,
        });
      });
  };

  const verifyOtp = (event) => {
    let otpInput = event.target.value;
    setOtp(otpInput);

    if (otpInput.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otpInput).then((result) => {
        setIsOtpVerified(true); // Update OTP verification status
        Swal.fire({
          icon: 'success',
          title: 'Successfully Logged In!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/dashboard');
        });
      }).catch((error) => {
        console.error('OTP Verification Error:', error);
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  };

  return (
    <div className='app__container'>
      <Card sx={{ width: '300px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography sx={{ padding: '20px' }} variant='h5' component='div'>Enter the OTP</Typography>
          <TextField sx={{ width: '240px' }} variant='outlined' label='OTP' value={otp} onChange={verifyOtp} />
        </CardContent>
      </Card>
      <div id="recaptcha"></div>
    </div>
  )
}

export default PhoneVerification;
