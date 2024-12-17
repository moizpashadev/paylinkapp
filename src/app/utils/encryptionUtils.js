const CryptoJS = require("crypto-js"); // Ensure CryptoJS is installed

/**
 * Encrypts data using AES encryption
 * @param {string | object} data - The data to encrypt (can be an object or string).\
 * @returns {string} - Encrypted data in string format.
 */
function encryptData(data) {
    if (!data) {
        throw new Error("Data is required to encryptData");
    }

    try {
        const stringifiedData = typeof data === "object" ? JSON.stringify(data) : String(data);
        return CryptoJS.AES.encrypt(stringifiedData, 'your-secret-key').toString();
    } catch (error) {
        console.error("Error encrypting data:", error);
        return null;
    }
}

module.exports = {
    encryptData,
};
    