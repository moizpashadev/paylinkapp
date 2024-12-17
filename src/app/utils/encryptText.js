import CryptoJS from "crypto-js";

export function encryptText(msg) {
    var keySize = 256;
    var salt = CryptoJS.enc.Utf8.parse('1203199320052021');

    // var key = CryptoJS.enc.Utf8.parse(environment.EncryptKey);
    var iv = CryptoJS.enc.Utf8.parse('1203199320052021');
    var encryptSecretKey = "u)16'#Z3,BWotF@y!o^$Aw}[+Is(-jrqd2V";

    var key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
        keySize: keySize / 32,
        iterations: 100
    });

    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(msg), key, {
        keySize: keySize / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
}