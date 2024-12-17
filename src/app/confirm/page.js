'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import Header from '../components/header';
import Footer from '../components/footer';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import logo from '../components/Images/nestlelogo.avif';

const PaymentConfirmation = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const { encryptData } = require('../utils/encryptionUtils');
  const { decryptData } = require('../utils/decryptUtils');
  const { encryptText } = require('../utils/encryptText');

  const [feeData, setFeeData] = useState(null); // State to store platform fee

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GetDatafromInquiry = sessionStorage.getItem('dataBus');
        if (GetDatafromInquiry) {
          const decryptedData = decryptData(GetDatafromInquiry);
          console.log(decryptedData);
          if (decryptedData) {
            setData({
              voucherData: decryptedData.voucherData,
              institution: decryptedData.Institution,
              kuickpayID: decryptedData.kuickpayID,
            });

            // Fetch the bearer token
            const params =
              decryptedData.Institution?.institutionID +
              '4uNuf29HnlFG7PGwek8IRgx6gDhOaE8WiPUwYkM572zbuhnyzq6HsPtuVu9M3JbD';
            const encryptedData = encryptText(params).toString(); // Encrypting the params

            const param = {
              ObjectValue: encryptedData,
            };
            const apiUrl = `https://testcheckout.kuickpay.com/api/KPPublicToken`;

            const tokenResponse = await axios.post(apiUrl, param);
            const { auth_token } = tokenResponse.data;

            if (tokenResponse?.data?.responseCode === '00') {
              //setBearerToken(auth_token);
              ///console.log(auth_token); 

              // Now that we have the bearer token, call the GetPlatformFee API
              const localstored = decryptData(sessionStorage.getItem('localstored')); // Assuming localstored is already set in sessionStorage
              await fetchPlatformFee(auth_token, decryptedData, localstored);
            
             
            }
          }
        }
      } catch (error) {
        console.error('Error during API calls:', error);
      }
    };

    fetchData();
  }, []); // Run once on page load


  const fetchPlatformFee = async (auth_token, decryptedData, localstored) => {
    
        const apiUrl =
        'https://testcheckout.kuickpay.com/api/GetPlatformFee';
    try {
      const platformFeeParams = {
        binNumber: localstored?.cardNumber.replace(/-/g, "").slice(0, 6),
        merchantId: decryptedData.Institution.institutionID,
        amount: decryptedData.voucherData.billAmount, // Use the correct property for amount
        orderID: decryptedData.kuickpayID,
        TranType: 'CARD',
      };
      
const response = await axios.get(apiUrl, {
  params: platformFeeParams, // Pass the query parameters
  headers: {
    Authorization: `Bearer ${auth_token}`,
  },
});

  
      if (response?.data?.responseCode === '00') {
        console.log(response.data);
         const FeeData =response.data;     //sessionStorage.setItem('getFee', encryptData(JSON.stringify(response.data)));
        
        setFeeData(FeeData);


       
      } else {
        console.error('Error fetching platform fee:', response.data);
      }
    } catch (error) {
      console.error('Error during GetPlatformFee API call:', error);
    }
  };
  
  const PayNowButtonEvent = () => {
    // Perform desired action on button click
    console.log("Pay Now button clicked!");
    // Add any additional logic here, such as API calls or navigation
    //console.log(data);
    const payload = {
      institutionID: data.institution.institutionID,
      orderID: data.kuickpayID,
      customerEmail: data.institution.institutionEmail,
      customerMobile: data.institution.institutionMobile,
      returnURL: 'http://localhost:3000',
      amount: feeData.amount,
      cnic: '',
      CardNumber: "qqwqwqw",//CardNumber.replace(/-/g, ""),
      SecurityCode: '123',
      ExpiryMonth: "ExpiryMonth",
      ExpiryYear: "ExpiryYear.substring(2).toString()",
      type: "Card",
      transactionDesc: 'PayLink',
      isLocation: "WL",
      AmountFeeCalculated: feeData.payableAmount,
    };

    console.log(payload);


  };


  return (
    <div className="p-1 flex flex-col min-h-screen z-10">
     <Header Heading={"PAYMENT LINK"}  logo={logo}/>

      <main className="flex items-center justify-center pt-5 sm:ml-5 sm:mr-5">
        <div className="w-full max-h-100 md:w-5/12 xsize:w-10/12 order-1 md:order-2 mr-1 sm:mr-4 md:mr-8 lg:mr-6 flex justify-center">
          <div className="px-4 py-3 md:shadow-custom-shadow rounded lg:border:none md:border:none xs:border-none border-gray-300 xsize:w-full sm:w-full lg:w-10/12">
          {feeData ? (
    <>
            <div className="flex justify-between items-center">
              <h2 className="heading tracking-widest text-xl lg:text-xl md:text-md xsize:text-md">Confirmation</h2>
            </div>
            
            <div className="border-t mt-2"></div>

            <div className="px-2 pt-4 flex justify-between items-center">
              <p className="InvSumContent">Bill Amount</p>
              <p className="InvSumContentweight"> PKR {feeData.amount}0</p>
            </div>
            <div className="px-2 pt-2 flex justify-between items-center">
              <p className="InvSumContent">Platform fee</p>
              <p className="InvSumContentweight">PKR {feeData.platformFee}0</p>
            </div>

            <div className="border-t mt-5"></div>
            <p className="px-2 pt-2 justify-between items-center lg:text-md md:text-md sm:text-sm xsize:text-xs">
              Your Platform Fee is Rs. for using a Visa Card
            </p>

            <div className="px-2 pt-5 flex justify-between items-center">
              <p className="text-lg font-light">Payable Amount</p>
              <p className="font-medium text-lg">PKR {feeData.payableAmount}</p>
            </div>

            <div className="flex items-center w-full py-2 mt-10">
              <button className="button-style" onClick={PayNowButtonEvent}>Pay now</button>
            </div>
            </>
  ) :(


<div>
          {/* Loading state with pulse effect */}
          <div className="flex justify-between items-center">
            <h2 className="heading tracking-widest text-xl lg:text-xl md:text-md xsize:text-md">
              Confirmation
            </h2>
          </div>
          <div className="border-t mt-2"></div>
          <div className="animate-pulse">
            <div className="px-2 pt-4 flex justify-between items-center">
              <p className="InvSumContent bg-gray-300 h-4 w-24 rounded"></p>
              <p className="InvSumContentweight bg-gray-300 h-4 w-20 rounded"></p>
            </div>
            <div className="px-2 pt-2 flex justify-between items-center">
              <p className="InvSumContent bg-gray-300 h-4 w-24 rounded"></p>
              <p className="InvSumContentweight bg-gray-300 h-4 w-20 rounded"></p>
            </div>
            <div className="border-t mt-5"></div>
            <p className="px-2 pt-2 bg-gray-300 h-4 w-48 rounded"></p>
            <div className="px-2 pt-5 flex justify-between items-center">
              <p className="text-lg font-light bg-gray-300 h-4 w-24 rounded"></p>
              <p className="font-medium text-lg bg-gray-300 h-4 w-20 rounded"></p>
            </div>
            <div className="flex items-center w-full py-2 mt-10">
              <div className="button-style bg-gray-300 h-8 w-32 rounded"></div>
            </div>
          </div>
        </div>



  )}
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
