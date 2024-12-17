const CryptoJS = require("crypto-js"); // Ensure CryptoJS is installed

/**
 * Decrypts AES-encrypted data.
 * @param {string} encryptedData - The encrypted data to decrypt.
- The key used for decryption (must be the same as used during encryption).
 * @returns {string | object} - The original data as a string or parsed object.
 */
function decryptData(encryptedData) {
    if (!encryptedData) {
        throw new Error("Encrypted data and secretKey are required for decryption");
    }

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, "your-secret-key");
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        // Attempt to parse JSON if applicable
        try {
            return JSON.parse(decryptedData);
        } catch {
            return decryptedData; // Return as plain string if not JSON
        }
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
}

module.exports = {
    decryptData,
};
