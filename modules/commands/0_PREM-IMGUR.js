module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "PREM BABU",
    description: "THIS BOT WAS MADE BY MR PREM BABU",
    commandCategory: "REPLY IMAGE",
    usages: "PREFIX",
    cooldowns: 1,
    dependencies: {
  "axios": "",}
};
 
module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];  
var ZiaRein = event.messageReply.attachments[0].url || args.join(" ");
    if(!ZiaRein) return api.sendMessage(`अरे यार फोटो को रिप्लाई कर के कमांड लिखो 🙂✌️`, event.threadID, event.messageID)
const res = await axios.get(`https://api.phamvandien.xyz/imgur?link=${encodeURIComponent(ZiaRein)}`);    
var ZiaReinn = res.data.uploaded.image;
    return api.sendMessage(ZiaReinn, event.threadID, event.messageID);
 
}
