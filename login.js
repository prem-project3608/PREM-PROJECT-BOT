const fs = require("fs");
const login = require("fca-horizon-remake");

var credentials = {email: "FB_EMAIL", password: "FB_PASSWORD"}; 

login(credentials, (err, api) => {
    if(err) return console.error(err);
    // login
    fs.writeFileSync('PREM-PROJECT.json', JSON.stringify(api.getAppState())); 
});
