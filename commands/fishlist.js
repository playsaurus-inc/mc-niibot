const Discord = require("discord.js");
const fs = require("fs");

	var fish; 
    fs.readFile('fish.json', (err, data) => {
        if(err) throw err;
        fish = JSON.parse(data);
    });

module.exports.run = async (bot, message, args) => {

	if (args[0] == undefined){
		for (i = 0; i < fish.users.length; i++){
	    	if (fish.users[i].id === message.author.id) {
				message.channel.send("", {embed: {
			        title: "POINTS",
			        description: message.author.username + ": " + fish.users[i].count,
			    }});
			}
		}
	}

	if (!isNaN(args[0])) {
		for (i = 0; i < fish.users.length; i++){
	    	if (fish.users[i].id === args[0]) {
				message.channel.send("", {embed: {
			        title: "POINTS",
			        description: bot.fetchUser(args[0]).username + ": " + fish.users[i].count,
			    }});
			}
		}
	}
}

module.exports.help = {
	name: "fishlist"
}