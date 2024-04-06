module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "PREM BABU",
	description: "THIS BOT WAS MADE BY MR PREM BABU",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
	
	 var datathread = await api.getThreadInfo(event.threadID);
     var namethread = datathread.name;
	 
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Kolkata").format("HH:mm:ss D/MM/YYYY");
	
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "❁ ═══════ ❃•❃ ═══════ ❁\n🔮            𝗣𝗥𝗘𝗠-𝗕𝗔𝗕𝗨             🔮\n❁ ═══════ ❃•❃ ═══════ ❁" +
	                "\n\n🌺 ग्रुप का नाम 𒁍 " + `${namethread}` +
                        "\n🌺 ग्रुप यूआईडी " + event.threadID +
                        "\n🌺 मैसेज {task}" +
	                "\n━━━━━━━━━━━━━━━━━━━━━━
                        "\n🌺 नाम 𒁍 " + (await Users.getData(event.author)).name +
                        "\n🌺 यूआईडी 𒁍 " + event.author +
                              Date.now() +
			"\n━━━━━━━━━━━━━━━━━━━━━━\n" +
			`टाइम और तारिक 𒁍 ${gio}`,
						
	   task = "";
	
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Name does not exist",
                    newName = event.logMessageData.name || "Walang pangalan";
            task = "किसी ने अपने ग्रुप का नाम बदला है " + "\nपुराना नाम 𒁍 " + oldName + "\nन्यू नाम 𒁍 " + newName;
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "मुझे न्यू ग्रुप में एड किया गया है";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "मुझे इस ग्रुप से निकाल दिया गया है"
            break;
        }
        default: 
            break;
    }

        if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
  var god = "100043895143106";

    return api.sendMessage(formReport, god, (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
      }
