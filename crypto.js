const CryptoJS = require("crypto-js");

module.exports ={
    encrypt: (value)=>{
        return CryptoJS.AES.encrypt(value, 'secret@key123').toString();
    },
    decrypt: (value)=>{
  
        return CryptoJS.AES.decrypt(value, 'secret@key123').toString(CryptoJS.enc.Utf8);
    },
}