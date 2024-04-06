const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "PREM BABU",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		en: {
			title: "❁ ═══════ ❃•❃ ═══════ ❁\n🔮            𝗣𝗥𝗘𝗠-𝗕𝗔𝗕𝗨             🔮\n❁ ═══════ ❃•❃ ═══════ ❁",
			added: "\n\nइस आईडी को एक न्यू ग्रुप में एड किया है।\n🌺 नाम :- %1",
			kicked: "\n\nइस आईडी को ग्रुप से निकाल दिया है।\n🌺 नाम :- %1",
			footer: "\n🌺 यूजर आईडी :- %1\n🌺 ग्रुप नाम :- %2\n🌺 ग्रुप आईडी :- %3\n🌺 टाइमिंग :- %4"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {
			let msg = getLang("title");
			const { author, threadID } = event;
			if (author == api.getCurrentUserID())
				return;
			let threadName;
			const { config } = global.GoatBot;

			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
			}
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
