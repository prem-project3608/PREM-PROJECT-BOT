module.exports.config = {
    name: "beta",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "PREM BABU",
    description: "THIS BOT IS MADE BY PREM BABU",
    commandCategory: "GOOGLE GPT SYSTAM",
    usages: "BETA",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("साथ में मैसेज तो लिखो 🤐🤞", tid, mid);
    try {
        const res = await axios.get(`https://ai.new911.repl.co/api/tools/blackai?question=${content}`);
        const respond = res.data.message;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
