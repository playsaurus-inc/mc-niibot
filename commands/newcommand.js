const Discord = require("discord.js");
const fs = require("fs");


var JSONcommands;

fs.readFile('commands.json', (err, data) => {
    if(err) throw err;
    JSONcommands = JSON.parse(data);
    });


module.exports.run = async (bot, message, args) => {


	if(!message.author.id == 238449007813197824 || !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Who do you think you are?")
	var messageArray = message.content.split("\"");

	if (messageArray[3] === undefined){
		message.channel.send("Command needs a response. Proper format is: \n`!newcommand \"command\" \"response\"`");
		return; 
	}

	JSONcommands['commands'].push({"command":[messageArray[1]],"count":0,"response":messageArray[3]})

	let edited_JSONcommands = JSON.stringify(JSONcommands);
 	fs.writeFileSync('commands.json', edited_JSONcommands);
	}

module.exports.help = {
	name: "newcommand"
}