const Discord = require("discord.js");
const fs = require("fs");


var HAILcommands;

fs.readFile('hailCommands.json', (err, data) => {
    if(err) throw err;
    HAILcommands = JSON.parse(data);
    });


module.exports.run = async (bot, message, args) => {


	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Who do you think you are?")
	var messageArray = message.content.split("\"");

	if (messageArray[3] === undefined){
		message.channel.send("Command needs a response. Proper format is: \n`!newhailcommand \"command\" \"response\"`");
		return; 
	}

	HAILcommands['commands'].push({"command":[messageArray[1]],"count":0,"response":messageArray[3]})

	let edited_HAILcommands = JSON.stringify(HAILcommands);
 	fs.writeFileSync('hailCommands.json', edited_HAILcommands);
	}

module.exports.help = {
	name: "newhailcommand"
}