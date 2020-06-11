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

	if (messageArray[2] === undefined){
		message.channel.send("Command needs a response. Proper format is: \n`!deletecommand \"command\"`");
		return; 
	}

    console.log(messageArray[2]);

    for (var i = 0; i < JSONcommands['commands'].length; i++)
    {
      if (JSONcommands['commands'][i].command == messageArray[1])
        {
            console.log("removing command " + JSONcommands['commands'][i].command[0]);
	        JSONcommands['commands'].splice(i, 1);
        }
    }

	let edited_JSONcommands = JSON.stringify(JSONcommands);
 	fs.writeFileSync('commands.json', edited_JSONcommands);
	message.reply("command deleted");
	}

module.exports.help = {
	name: "deletecommand"
}