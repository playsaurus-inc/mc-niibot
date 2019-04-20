const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


	if(!args[0]) return message.channel.send("pst. you forgot to include a number");
	
	message.channel.send(10 + Math.ceil(1.5**args[0]));

	}

module.exports.help = {
	name: "revive"
}