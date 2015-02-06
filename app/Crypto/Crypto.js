var crypto = require('crypto');

module.exports = function(){
    return{
        /**
        * crypt
        * can user for crypt str
        * @params algo String 
        * @params pass   String
        * @params str    String
        *
        * @return String
        */
        crypt: function(algo, pass, str){
            var tab = [];
            var cipher = crypto.createCipher(algo, pass);
            tab.push(cipher.update(str, 'binary', 'hex'));
            tab.push(cipher.final('hex'));
            return tab.join('');
        },
        /**
        * decrypt
        * can use for decrypt str
        * @params algo String
        * @params pass   String
        * @params str    String
        *
        * @return string
        */
        decrypt: function(algo, pass, str){
            var tab = [];
            var decipher = crypto.createDecipher(algo, pass);
            tab.push(decipher.update(str, "hex", "binary"));
            tab.push(decipher.final('binary'));
            return tab.join('');
        },
        /**
        *
        */
        getCiphers: function(){
            return crypto.getCiphers();
        }
    };
};