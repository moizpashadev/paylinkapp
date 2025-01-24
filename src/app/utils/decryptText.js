import CryptoJS from "crypto-js";

export function decryptTextForGateway(encryptedMsg) {
    const keySize = 256;
    const salt = CryptoJS.enc.Utf8.parse('1203199320052021');
    const iv = CryptoJS.enc.Utf8.parse('1203199320052021');
    const encryptSecretKey = "u)16'#Z3,BWotF@y!o^$Aw}[+Is(-jrqd2V";

    const key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
        keySize: keySize / 32,
        iterations: 100
    });

    const decrypted = CryptoJS.AES.decrypt(encryptedMsg, key, {
        keySize: keySize / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
