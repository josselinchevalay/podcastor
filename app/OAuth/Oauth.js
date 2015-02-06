/**
* @author josselin CHEVALAY <josselin54.chevalay@gmail.com>
* @Package App/Ouath
* @class Oauth
*/
var uuid = require('node-uuid');
var crypto = require('../Crypto/Crypto.js');
module.exports = function(){
    return {
        algo: process.env.PODCASTOR_CIPHER || "aes192", // algo for crypt 
        pass: process.env.PODCASTOR_KEYMASTER || "123658ezpfjpi", // password 
        maxTimeout: process.env.PODCASTOR_MAX_TIMEOUT || 360, // max timeout for revive and other security token
        /**
        * connect
        * @params req Request
        * @params database Object
        * 
        * @return ticket Object contains user and isAuthorize or not
        */
        connect: function(req, database){
            var ticket = {}; // create ticket can authorize user
            var cryptor = new crypto();
            if(user = this.isAuthorize(req, database)){ // check if headers contains authorize key valid
                ticket.isAuthorize = true;
                ticket.User = user;
                return ticket;
            }else{ // else login the user
                var user = req.body;
                if(user.Type == 'User'){
                    ticket.User = user;
                    var credentials = JSON.parse(req.body.Credentials);
                    credentials.Login = cryptor.crypt(this.algo, this.pass, credentials.Login);
                    credentials.Password = cryptor.crypt(this.algo, this.pass, credentials.Password);
                    user.Credentials = credentials;
                    var userExist = database.find({ Credentials :{Login :user.Credentials.Login, Password : user.Credentials.Password, Provider: user.Credentials.Provider} }).value();
                    if(userExist){
                        ticket.User = userExist;
                        ticket.isAuthorize = true;
                        ticket.User = this.revive(ticket.User); // generate AuthorizeKey and SESSIONID
                        return ticket;
                    }
                }
            }
            ticket.isAuthorize = false;
            ticket.User = {};
            return ticket;            
        },
        /**
        * isAuthorize
        * can use for check AuthorizeKey in head of request
        * don't use on web this internal
        * @params req Request
        * @params database Object
        *
        * @return boolean
        */
        isAuthorize: function(req, database){
            var userExist = database.find( {Credentials:{AuthorizeKey: req.headers.authorize}}).value();
            if(userExist){
                return  userExist;
            }
            return false;
        },
        /**
        * revive
        * can refresh authorize key
        * @params User object current user
        * 
        * @return User
        */
        revive: function(user){
            var cryptor = new crypto();
            user.Credentials.AuthorizeKey = uuid.v4();
            user.Credentials.SessionID = uuid.v1();
            user.Credentials.TTL =Math.floor((this.maxTimeout)*Math.random()+1); // alea timeout
            user = this.choiceAleaCipher(user);
            // TODO update on DB
            return user;
        },

        /**
        * signin
        * can save on db a new User 
        * @params user User current user at save on db
        * @params database DB 
        *
        * @return USER
        */
        signin: function(user, database){
            var already = database.find(user).value();
            if(already){
                return already;
            }else{
                var cryptor = new crypto();
                user.Credentials.Login = cryptor.crypt(this.algo, this.pass, user.Credentials.Login);
                user.Credentials.Password = cryptor.crypt(this.algo, this.pass, user.Credentials.Password);
                user = this.revive(user);
                user.Uid = uuid.v4();
                user.Pseudo = cryptor.decrypt(this.algo, this.pass, user.Credentials.Login);
                database.push(user);
                database.save();
            }
            return user;
        },

        /**
        * choiceAleaCipher
        * can user for change autamaticaly cipher and key form user communication
        * @param user object
        *
        * @return object
        */
        choiceAleaCipher: function(user){
            var cryptor = new crypto();
            var algos = cryptor.getCiphers();
            var aleaIndex = Math.floor((algos.length)*Math.random()+1);
            var currentAlgo = user.Credentials.Cypher;
            if(user.Credentials.Cypher)
            {
               while(aleaIndex == algos[currentAlgo]){
                    aleaIndex = Math.floor((algos.length)*Math.random()+1);
                } 
            }
            user.Credentials.Cypher = algos[aleaIndex];
            user.Credentials.Key = uuid.v4();
            return user;
        }

    };
};