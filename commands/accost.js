const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if (args[0] < 100000) {

	sum = 0;
	sumt = 0; 

	for (x = 0; x < args[0]; x++) {
		
		sum = 100 + (50 * x)
		sumt = sumt + sum
	}

	message.channel.send("" + sumt);
}

}

module.exports.help = {
	name: "acCost"
}