const util = require('util');
const request = require('request');
const atob = require('atob');
const botconfig = require(__dirname + "/botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const zlib = require("zlib");
const JSONbig = require('json-bigint')({useNativeBigInt: true});;
const bot = new Discord.Client({disableMentions: 'everyone'});
bot.commands = new Discord.Collection();


var prefixes = ["!", "~"];

function log(log)
{
	var time = new Date();
	console.log("[" + (time.getHours() % 12) + ":" + time.getMinutes() + ":" + time.getSeconds() + "] " + log);
}

var JSONcommands;
var JSONsaves;
var JSONBannedsaves;
var bannedFromRoles;

setInterval(function ()
{
	log("writing to files");
	fs.writeFileSync(__dirname + '/saves.json', JSON.stringify(JSONsaves));
	fs.writeFileSync(__dirname + '/bannedSaves.json', JSON.stringify(JSONBannedsaves));
}, 1000 * 60 * 5)

fs.readdir(__dirname + "/commands/", (err, files) =>
{
	if(err) log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0)
	{
		log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) =>
	{
		let props = require(__dirname + `/commands/${f}`);
		log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readFile(__dirname + '/commands.json', (err, data) =>
{
	if(err) throw err;
	JSONcommands = JSON.parse(data);
});

fs.readFile(__dirname + '/difficulty.json', (err, data) =>
{
	if(err) throw err;
	difficulty = JSONbig.parse(data);
});

fs.readFile(__dirname + '/saves.json', (err, data) =>
{
	if(err) throw err;
	JSONsaves = JSON.parse(data);
});

fs.readFile(__dirname + '/bannedSaves.json', (err, data) =>
{
	if(err) throw err;
	JSONBannedsaves = JSON.parse(data);
});

fs.readFile(__dirname + '/bannedFromRoles.json', (err, data) =>
{
	if(err) throw err;
	bannedFromRoles = JSON.parse(data);
});

function getRoles()
{
	return new Promise((res, rej) =>
	{
		res(bot.guilds.cache.get("104739787872694272").roles);
	});
}

function getGuildMember(userID)
{
	return new Promise((res, rej) =>
	{
		res(bot.guilds.cache.get("104739787872694272").members.fetch(userID));
	});
}

function getNumberOfRoles(userID)
{
	return new Promise((res, rej) =>
	{
		res(getGuildMember(userID)
			.then((member) =>
			{
				var numRoles = member.roles.cache
					.map((role) => role.toString());
				return numRoles.length;
			}));
	});
}

function setRole(depth, userID)
{

	if(bannedFromRoles.bannedFromRoles.includes(userID)) return;
	getGuildMember(userID)
		.then(guildMember =>
		{

			var {cache} = guildMember.guild.roles;
			//yet to implement roles for Clicker Heroes
		}).catch(console.error);
}

function decodeSave(data)
{
	var inflated = zlib.inflateSync(new Buffer.from(data.slice(32), 'base64')).toString();
	return inflated;
}


bot.on("ready", async () =>
{
	log(`${bot.user.username} is online!`);
});


bot.on("message", async message =>
{

	if(message.author.bot) return;
	var memberJoinTime;

	if(message.member)
	{
		memberJoinTime = message.member.joinedTimestamp;
	};

	if(message.guild.id == "104739787872694272")
	{
		getNumberOfRoles(message.author.id)
			.then((numRoles) =>
			{
				var lowercaseMessage = message.content.toLowerCase();
				console.log(lowercaseMessage);
				if((lowercaseMessage.includes("@everyone") || lowercaseMessage.includes("free") || lowercaseMessage.includes("steam") || lowercaseMessage.includes("airdrop")) && (lowercaseMessage.includes("nitro") || lowercaseMessage.includes("nltro")) && (message.embeds.length > 0 || lowercaseMessage.includes("https:/"))) 
				{
					console.log(message.content);
					var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");
					message.delete();
					message.member.ban({days: 7, reason: 'posting nitro scam'})
						.then(console.log)
						.catch(console.error);

					auditChannel.send(`Banned <@${message.member.id}> for posting nitro scam.`)
				}
			});
	}

	var currentTime = Date.now();

	//DM REQUESTING SAVE CODE

	if(message.channel.type === "dm")
	{
		if(bannedFromRoles.bannedFromRoles.includes(message.author.id))
		{
			message.reply("Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.");
		}
		else
		{
			log("received DM");
			if(message.attachments.first())
			{
				if(message.attachments.first().name === `message.txt`)
				{
					request.get(message.attachments.first().url)
						.on('error', console.error)
						.pipe(fs.createWriteStream(__dirname + '/message.txt'))
						.on('finish', function ()
						{
							fs.readFile(__dirname + '/message.txt', "utf8", (err, data) =>
							{
								var save = ""

								if(data.includes("7a990"))
								{
									var save = decodeSave(data);
								}
							})
						})
				}
			}
		}
	}

	if(JSONcommands)
	{
		var commands = JSONcommands.commands;
		for(x = 0; x < commands.length; x++)
		{
			for(i = 0; i < commands[x].command.length; i++)
			{
				for(n = 0; n < prefixes.length; n++)
				{
					if(message.content.toLowerCase().startsWith(prefixes[n] + commands[x].command[i].toLowerCase()))
					{
						var commandToCheck = message.content.substr(prefixes[n].length, message.content.length);
						if(commandToCheck.length == commands[x].command[i].length)
						{
							message.channel.send("" + commands[x].response.split("\\n").join("\n"));
							return;
						}
					}
				}
			}
		}
	}

	if(message.channel.id == 653462022033244180 && !message.content.toLowerCase().startsWith("report:"))
	{
		log(message.content);
		if(!message.member.hasPermission("MANAGE_MESSAGES"))
		{
			message.delete();
			message.member.send("Hey, it appears you posted in the bug reports channel with out the proper format. If your message was a bug report, please edit it to include \"report:\" and resend it to the bug reports channel, thanks! \n\n Message Copy: " + message.content)
				.then(console.log)
				.catch(console.error);

			message.channel.send("Please only use this channel for bug reports. All messages should start with \"Report:\". Discussions should be had in <#467940002228207626>. If you have more information you want to add, please edit your report with more details. If your message was a report, a copy of it has been sent to your DM's.")
		}
	}

	//Auto mod stuff

	if(message.content.includes("discord.gg")) 
	{
		var auditChannel = message.guild.channels.cache.find(channel => channel.name === "mod-log");
		if(memberJoinTime > currentTime - 43200000)
		{
			message.delete();
			log("Link posted by " + message.author.username);
			message.member.send("Do not post links to other Discord Servers")
				.then(console.log)
				.catch(console.error);

			auditChannel.send(`Warned <@${message.member.id}> for posting links to a different Discord server.`)
		}
	}


	for(n = 0; n < prefixes.length; n++)
	{

		if(message.content.startsWith(prefixes[n] + "newCommand") || message.content.startsWith(prefixes[n] + "newcommand")) 
		{

			var messageArray = message.content.split("\"");
			log(messageArray[1]);
			log(messageArray[3]);

			if(!message.author.id == 238449007813197824 || !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Who do you think you are?")

			if(messageArray[3] === undefined)
			{
				message.channel.send("Command needs a response. Proper format is: \n`!newcommand \"command\" \"response\"`");
				return;
			}

			var doesCommandExist = false;

			if(JSONcommands) 
			{
				var commands = JSONcommands.commands;
				for(x = 0; x < commands.length; x++) 
				{
					for(i = 0; i < commands[x].command.length; i++)
					{
						for(n = 0; n < prefixes.length; n++)
						{
							if(messageArray[1].toLowerCase() == commands[x].command[i].toLowerCase())
							{
								var embed = new Discord.MessageEmbed()
									.setTitle("ERROR: Command already exists")
									.addField("Existing command", messageArray[1])
									.addField("Existing response", commands[x].response.split("\\n").join("\n"))
								message.reply("This command already exists, use !deleteCommand to remove the old command first or use a different command name", embed);
								doesCommandExist = true;
								return;

							}
						}
					}
				}
			}

			if(!doesCommandExist)
			{
				if(JSONcommands['commands']) 
				{
					JSONcommands['commands'].push({"command": [messageArray[1]], "count": 0, "response": messageArray[3]})
				}
				else 
				{
					message.reply("Failed to read command file please try again");
				}

				var edited_JSONcommands = JSON.stringify(JSONcommands);
				fs.writeFileSync(__dirname + '/commands.json', edited_JSONcommands);
				message.reply("", {
					embed: {
						title: "Command added",
						fields: [
							{
								name: 'Command name:',
								value: messageArray[1],
								inline: true,
							},
							{
								name: 'Response:',
								value: messageArray[3],
							}
						],
					}
				});
			}

		}
		else if(message.content.startsWith(prefixes[n] + "deleteCommand") || message.content.startsWith(prefixes[n] + "deletecommand")) 
		{

			if(!message.author.id == 238449007813197824 || !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Who do you think you are?");
			var messageArray = message.content.split("\"");

			if(messageArray[1] === undefined)
			{
				message.channel.send("Failed to supply command name. Proper format is: \n`!deleteCommand \"command\"`");
				return;
			}

			for(var i = 0; i < JSONcommands['commands'].length; i++)
			{
				if(JSONcommands['commands'][i].command == messageArray[1])
				{
					console.log("removing command " + JSONcommands['commands'][i].command[0]);
					JSONcommands['commands'].splice(i, 1);
				}
			}

			var edited_JSONcommands = JSON.stringify(JSONcommands);
			fs.writeFileSync(__dirname + '/commands.json', edited_JSONcommands);
			message.reply("command deleted");
		}

		if(message.content.toLowerCase().startsWith(prefixes[n] + "requestsave"))
		{
			var messageArray = message.content.split(" ");
			if(message.member.hasPermission("MANAGE_MESSAGES"))
			{
				var mentionedUserId = 0;
				if(message.mentions.users.first())
				{
					mentionedUserId = message.mentions.users.first().id;
				}
				else
				{
					mentionedUserId = messageArray[1];
					console.log(mentionedUserId);
				}

				var saves = "";
				if(bannedFromRoles.bannedFromRoles.includes(mentionedUserId))
				{
					saves = JSONBannedsaves;
				}
				else
				{
					saves = JSONsaves;
				}

				for(var i = saves.saves.length; i > 0; i--)
				{
					if(saves.saves[i])
					{
						if(saves.saves[i].userID == mentionedUserId)
						{
							var save = new Discord.MessageAttachment(Buffer.from(JSON.stringify(saves.saves[i].save), 'utf-8'), 'save.txt')
							if(bannedFromRoles.bannedFromRoles.includes(mentionedUserId))
							{
								message.channel.send("Users save has been marked as cheated");
							}
							message.channel.send("Found latest user save", save);
							break;
						}
					}
				}
			}
			else
			{
				message.reply("Who do you think you are?");
			}
		}

		if(message.content.toLowerCase().startsWith(prefixes[n] + "whois"))
		{
			var messageArray = message.content.split(" ");
			var target;
			if(message.mentions.users.first())
			{
				target = message.mentions.users.first();
			}
			else if(messageArray[1])
			{
				target = messageArray[1];
			}
			else
			{
				target = message.author;
			}


			getGuildMember(target.id)
				.then((user) =>
				{
					const whois = new Discord.MessageEmbed()

						.setAuthor(`${target.username}`)
						.addField('Discord Name', `${target.username}`, true)
						.addField('Tag', `${target.discriminator}`, true)
						.addField('Joined Server Date', `${user.joinedAt}`, true)
						.addField('Account Creation Date', `${target.createdAt}`, true)
						.setThumbnail(target.displayAvatarURL({dynamic: false}))
						.setColor('RANDOM')
					message.channel.send(whois)
				})
		}

		if(message.content.toLowerCase().startsWith(prefixes[n] + "banfromroles"))
		{
			var messageArray = message.content.split(" ");
			if(message.member.hasPermission("MANAGE_MESSAGES"))
			{
				var mentionedUserId = 0;
				if(message.mentions.users.first())
				{
					mentionedUserId = message.mentions.users.first().id;
				}
				else
				{
					mentionedUserId = messageArray[1];
				}

				var targetMember = message.guild.members.cache.get(mentionedUserId);

				bannedFromRoles.bannedFromRoles.push(mentionedUserId);
				targetMember.roles.set([]);
				var edited_bannedFromRoles = JSON.stringify(bannedFromRoles);
				fs.writeFileSync(__dirname + '/bannedFromRoles.json', edited_bannedFromRoles);

				message.channel.send(`<@${mentionedUserId}> banned from roles`)

			}
			else
			{
				message.reply("Who do you think you are?");
			}
		}

		if(message.content.toLowerCase().startsWith(prefixes[n] + "unbanfromroles"))
		{
			var messageArray = message.content.split(" ");
			if(message.member.hasPermission("MANAGE_MESSAGES"))
			{
				var mentionedUserId = 0;
				if(message.mentions.users.first())
				{
					mentionedUserId = message.mentions.users.first().id;
				}
				else
				{
					mentionedUserId = messageArray[1];
				}

				var indexOfUser = bannedFromRoles.bannedFromRoles.indexOf(messageArray[1]);
				if(indexOfUser > 0)
				{
					bannedFromRoles.bannedFromRoles == bannedFromRoles.bannedFromRoles.splice(indexOfUser, 1);
				}
				var edited_bannedFromRoles = JSON.stringify(bannedFromRoles);
				fs.writeFileSync(__dirname + '/bannedFromRoles.json', edited_bannedFromRoles);

				message.channel.send(`<@${mentionedUserId}> unbanned from roles`)
			}
			else
			{
				message.reply("Who do you think you are?");
			}
		}
	}

	var prefix = false;
	for(const thisPrefix of prefixes)
	{
		if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
	}
	if(!prefix) return;

	var messageArray = message.content.split(" ");
	var cmd = messageArray[0];
	var args = messageArray.slice(1);

	var commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot, message, args);
});

bot.on('error', console.error)

bot.login(botconfig.token);

