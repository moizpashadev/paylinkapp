// const CryptoJS = require("crypto-js"); // Ensure CryptoJS is installed

// /**
//  * Decrypts AES-encrypted data.
//  * @param {string} encryptedData - The encrypted data to decrypt.
// - The key used for decryption (must be the same as used during encryption).
//  * @returns {string | object} - The original data as a string or parsed object.
//  */
// function decryptData(encryptedData) {
//     if (!encryptedData) {
//         throw new Error("Encrypted data and secretKey are required for decryption");
//     }

//     try {
//         const bytes = CryptoJS.AES.decrypt(encryptedData, "2FBC1A0D4B62EABEC9D6E35A9F0D47E967DDBF4A1EC98AC9A711EEB91856B6D4");
//         const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

//         // Attempt to parse JSON if applicable
//         try {
//             return JSON.parse(decryptedData);
//         } catch {
//             return decryptedData; // Return as plain string if not JSON
//         }
//     } catch (error) {
//         console.error("Error decrypting data:", error);
//         return null;
//     }
// }

// module.exports = {
//     decryptData,
// };






const CryptoJS = require("crypto-js");

function decryptData(encryptedData) {
    if (!encryptedData) {
        throw new Error("Encrypted data is required for decryption");
    }

    try {
        // Convert from Base64 to bytes
        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);

        // Extract the IV (first 16 bytes) and encrypted data
        const iv = CryptoJS.enc.Hex.parse(encryptedBytes.toString(CryptoJS.enc.Hex).slice(0, 32)); // First 16 bytes for IV
        const encrypted = encryptedBytes.clone().skip(16); // Skip the first 16 bytes (IV)

        // Define the key (must match the one used for encryption)
        const key = CryptoJS.enc.Hex.parse("2FBC1A0D4B62EABEC9D6E35A9F0D47E967DDBF4A1EC98AC9A711EEB91856B6D4"); // 256-bit key

        // Decrypt the data with the key and IV
        const decryptedBytes = CryptoJS.AES.decrypt(
            { ciphertext: encrypted },
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        );

        // Convert decrypted data to string (UTF-8)
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

        // Optionally, parse the decrypted JSON if it's an object
        const parsedData = JSON.parse(decryptedData);
        
        return parsedData;  // Return the decrypted and parsed data
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
}

module.exports = {
    decryptData,
};

