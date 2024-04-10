const fs = require("fs");
module.exports.config = {
  name: "gm",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("good morning") ||
     react.includes("gud morning") || react.includes("gm") || react.includes("GM") ||
react.includes("Gm") ||
react.includes("GOOD MORNING")) {
    var msg = {
        body: `𝐕𝐄𝐑𝐘 𝐆𝐎𝐎𝐃 𝐌𝐎𝐑𝐍𝐈𝐍𝐆😇  ${name} बाबू`,attachment: fs.createReadStream(__dirname + `/shankar/gm.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☀️", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }
