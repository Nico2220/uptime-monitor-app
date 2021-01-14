//container for all the environements

const { clearScreenDown } = require("readline");

const environements = {};

//staging (Default enviroment)
environements.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "hashingSecret",
  maxChecks: 5,
  twilio: {
    accountSid: "ACb32d411ad7fe886aac54c665d25e5c5d",
    authToken: "9455e3eb3109edc12e3d8c92768f7a67",
    fromPhone: "+15005550006",
  },
};

environements.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "hashingSecret",
  maxChecks: 5,
  twilio: {
    accountSid: "",
    authToken: "",
    fromPhone: "",
  },
};

//Determine witch enviroment that was passed in command-line
const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

//environement to export

const enviromentToExp =
  typeof environements[currentEnv] == "object"
    ? environements[currentEnv]
    : environements.staging;

console.log(enviromentToExp);

module.exports = enviromentToExp;
