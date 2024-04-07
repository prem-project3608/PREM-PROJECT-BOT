lmodule.exports.config = {
    name: "file",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "PREM BABU",
    description: "THIS BOT WAS MADE BY MR PREM BABU",
    commandCategory: "Admin",
    usages: "PREFIX",
    cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
    if(event.senderID != handleReply.author) return; 
    const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/'+target);
        if(fileOrdir.isDirectory() == true) {
          var typef = "[FOLDER NAME 𒁍 ";
          fs.rmdirSync(__dirname+'/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
          var typef = "FILE NAME 𒁍 ";
          fs.unlinkSync(__dirname+"/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("मैंने डिलीट कर दिया बॉस जो अपने सिलेक्ट किया था\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {
  
  const fs = require("fs-extra");
    const permission = ["100043895143106"];
  	if (!permission.includes(event.senderID)) return api.sendMessage("आपको इस कमांड की परमीशन नही है सॉरी 😐", event.threadID, event.messageID);
  var files = fs.readdirSync(__dirname+"/") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
    var msg = `
Cách dùng lệnh:
•Key: start <text>
•Tác dụng: Lọc ra file cần xóa có ký tự bắt đầu tùy chọn
•Ví dụ: commands rank
•Key: ext <text>
•Tác dụng: Lọc ra file cần xóa có đuôi tùy chọn
•Tác dụng: lọc ra các file trong tên có text tùy chỉnh
•Ví dụ: commands a
•Key: để trống
•Tác dụng: lọc ra tất cả các file trong cache
•Ví dụ: commands
•Key: help
•Tác dụng: xem cách dùng lệnh
•Ví dụ: commands help`;
    
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));
    
    if(files.length == 0) return api.sendMessage(`There are no files in the cache that begin with: ${word}`, event.threadID ,event. messageID);
    var key = `There  are ${files.length} files. The file has a character that starts with .: ${word}`;
  }
  
  //MADE BY MR PREM BABU
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));
    
    if(files.length == 0) return api.sendMessage(`There are no files in the commands that have a character ending in .: ${ext}`, event.threadID ,event. messageID);
    var key = `There ${files.length} file has the extension: ${ext}`;
  }
  //all file
  else if (!args[0]) {
    if(files.length == 0) return api.sendMessage("बॉस जो नंबर अपने सिलेक्ट किया है वो नंबर का फाइल नही है। 😐", event.threadID ,event. messageID);
  var key = "नीचे सारे फाइल और फोल्डर के नाम लिखे है। 🙂";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`There are no files in the name with the character: ${word}`, event.threadID ,event. messageID);
    var key = `There are ${files.length} file in the name has the character: ${word}`;
  }
  
    files.forEach(file => {
        var fileOrdir = fs.statSync(__dirname+'/'+file);
        if(fileOrdir.isDirectory() == true) var typef = "FOLDER NAME 𒁍 ";
        if(fileOrdir.isFile() == true) var typef = "FILE NAME 𒁍 ";
        msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`बॉस जिस फाइल या फोल्डर को डीलर करना है वो नंबर मेरे मैसेज को रिप्लाई कर के लिख दीजिए \n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
 
} 
