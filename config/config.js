// config dependencies
const jsforce = require("jsforce");

// obj destructoring to bring in env. variables for security
const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;

// create sf connection func to init connection and login using env creds
let conn;
function createConnection() {
  conn = new jsforce.Connection({
    loginURL: SF_LOGIN_URL,
  });
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(
        `login successful for user id: ${userInfo.id} on organization id: ${userInfo.organizationId}`
      );
    }
  });
}

// can't seem to export createConnection to access conn on api-routes
function connection() {
  if (!conn) {
    createConnection();
    console.log("connection: ", conn);
  }
  return conn;
}

module.exports = connection;
