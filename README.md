# Salesforce Integration - Query Salesforce Trailhead Playground for Accounts
## Description

Stable verison of an read application designed to return Account records (Id, Name) tied to your personal Salesforce org. The application also supports navigating to ```api/account/:id``` to return ```json``` response for specific Account.Id provided in the URL.

### Get Started

- clone [GitHub Repo](https://github.com/andrewcircelli/node-fs-sf-integrations.git)
- use command ```npm init -y ``` to install dependencies
- create env file with below
  - PORT=
  - SF_LOGIN_URL=https://login.salesforce.com
  - SF_USERNAME=
  - SF_PASSWORD=
  - SF_TOKEN=
- use command ```npm run start:dev``` to spin up server on localhost if you are further developing OR
- use command ```npm run start``` to spin up server on localhost
- press "Express Accounts" button to return all Accounts 

### Primary Modules

- express for server, api
- nodemon for improved dx
- jsforce to connect to salesforce
- dotenv to hide sensitive data

### Next Steps to Consider

- Additional API routes or button to navigate to ```/api/account/:id```, right now this must be done manually for a specific id.
- Implement Router method of express.js for all ```/api/account related routes```
- Return Limits and Filtering of "Express Accounts" button
- Improve error handling in config file (creates and logs into Salesforce instance)
