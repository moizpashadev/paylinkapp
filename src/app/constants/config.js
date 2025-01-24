
const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {
    appUrl: 'https://uat-paymentlink.kuickpay.com',
    gatewayUrl: 'https://testcheckout.kuickpay.com',
  },
  production: {
    // appUrl: 'https://paymentlink.kuickpay.com',
    // gatewayUrl: 'https://checkout.kuickpay.com',
    appUrl: 'https://uat-paymentlink.kuickpay.com',
    gatewayUrl: 'https://testcheckout.kuickpay.com',
  },


  
};

export const API_URLS = config[environment];