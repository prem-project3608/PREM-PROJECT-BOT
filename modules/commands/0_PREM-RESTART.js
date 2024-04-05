module.exports.config = {
	name: "resart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "PREM BABU",
	description: "THIS BOT WAS MADE BY MR PREM BABU",
	commandCategory: "RESTARTING SYSTEM",
	usages: "PREFIX",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`दो मिनट रुको प्रेम बाबू जी रिस्टार्ट हो रहा है...🙂✌️`, threadID, () => process.exit(1));
}
