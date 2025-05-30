const util = require('util');
const request = require('request');
const atob = require('atob');
const { token, clientId, guildId } = require(__dirname + "/botconfig.json");
const { REST, Routes, Client, Collection, Events, GatewayIntentBits, Partials, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const path = require('path');
const JSONbig = require('json-bigint')({ useNativeBigInt: true });;
const zlib = require("zlib");
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    }
});
var messageText;
var userMessageHistory = {};
var channelsPosttedIn = []; //should refactor to be a part of user message history

bot.commands = new Collection();
// Grab all the command files from the commands directory you created earlier
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        bot.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
    try {
        //console.log(util.inspect(commands.reduce((accumulator, currentValue) => accumulator.concat(currentValue.name), []).sort()))
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

var JSONsaves;
var JSONBannedsaves;
var bannedFromRoles;

setInterval(function () {
    log("writing to files");
    fs.writeFileSync(__dirname + '/saves.json', JSON.stringify(JSONsaves));
    fs.writeFileSync(__dirname + '/bannedSaves.json', JSON.stringify(JSONBannedsaves));
}, 1000 * 60 * 5)


fs.readFile(__dirname + '/saves.json', (err, data) => {
    if (err) throw err;
    JSONsaves = JSON.parse(data);
});

fs.readFile(__dirname + '/bannedSaves.json', (err, data) => {
    if (err) throw err;
    JSONBannedsaves = JSON.parse(data);
});

fs.readFile(__dirname + '/bannedFromRoles.json', (err, data) => {
    if (err) throw err;
    bannedFromRoles = JSON.parse(data);
});

bot.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand() && !interaction.isAutocomplete()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    else if (interaction.isAutocomplete()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.autoComplete(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

function log(log) {
    var time = new Date();
    console.log("[" + (time.getHours() % 12) + ":" + time.getMinutes() + ":" + time.getSeconds() + "] " + log);
}

function getRoles() {
    return new Promise((res, rej) => {
        res(bot.guilds.cache.get(guildId).roles);
    });
}

function getGuildMember(userID) {
    return new Promise((res, rej) => {
        res(bot.guilds.cache.get(guildId).members.fetch(userID));
    });
}

function getNumberOfRoles(userID) {
    return new Promise((res, rej) => {
        res(getGuildMember(userID)
            .then((member) => {
                var numRoles = member.roles.cache
                    .map((role) => role.toString());
                return numRoles.length;
            }));
    });
}

function getHighestHeroUnlocked(data) {
    let saveObject = JSON.parse(data);
    let heroes = saveObject.heroCollection.heroes
    let objectKeys = Object.keys(heroes);
    let currentHighestValue = 0;

    objectKeys.forEach(hero => {
        if (heroes[hero].level > 0) currentHighestValue = hero;
    })

    return currentHighestValue;
}

function setRole(highestHeroUnlocked, message) {
    let userID = message.author.id;

    if (bannedFromRoles.bannedFromRoles.includes(userID)) return;
    getGuildMember(userID)
        .then(guildMember => {
            var rollAdded = false;
            var roles = {
                "954478762609770558": "Cid",
                "954478916037390377": "Treebeast",
                "954479042189488148": "Ivan",
                "954479205205291018": "Brittany",
                "954503656806416384": "Fisherman",
                "954479315481931817": "Betty",
                "954479514824622200": "Samurai",
                "954479682991050773": "Leon",
                "954479826306215946": "Forest Seer",
                "954479940525514782": "Alexa",
                "954480031508340756": "Natalia",
                "954480252904685598": "Mercedes",
                "954480412846092298": "Bobby",
                "954480498518929529": "Broyle",
                "954480578315563008": "Sir George II",
                "954480673027158016": "King Midas",
                "954480842124701747": "Referi Jerator",
                "954480982713585704": "Abaddon",
                "954481096903516200": "Ma Zhu",
                "954481186615459840": "Amenhotep",
                "954481276860104804": "Beastlord",
                "954481370112081931": "Athena",
                "954481448226803724": "Aphrodite",
                "954481585774821418": "Shinatobe",
                "954481700220600320": "Grant",
                "954481771087527966": "Frostleaf",
                "954481841111445535": "Dread Knight",
                "954481917686866061": "Atlas",
                "954481993528258600": "Terra",
                "954482077535985734": "Phthalo",
                "954482150009372802": "Orntchya",
                "954482335867363439": "Lilin",
                "954482437990281227": "Cadmia",
                "954482614629175346": "Alabaster",
                "954482788608901181": "Astraea",
                "954482883492454400": "Chiron",
                "954504616538697769": "Moloch",
                "954482966480969808": "Bomber Max",
                "954483061205123172": "Gog",
                "954483163105734747": "Wepwawet",
                "954483239597260971": "Tsuchi",
                "954483392597073980": "Skogur",
                "954483519269249084": "Moeru",
                "954483641180889098": "Zilar",
                "954483717169086524": "Madzi",
                "954483982609842186": "Xavira",
                "954484076750991431": "Cadu",
                "954484161912119316": "Ceus",
                "954484216203182240": "The Maw",
                "954484291172175953": "Yachiyl",
                "954484414140780604": "Rose",
                "954484508579733514": "Sophia",
                "954484562874990614": "Blanche",
                "954484630868881421": "Dorothy"
            }
            var roleKeys = Object.keys(roles);
            var { cache } = guildMember.guild.roles;
            log("adding role")

            if (highestHeroUnlocked > 0) {
                guildMember.roles.add(roleKeys[highestHeroUnlocked - 1]);
                rollAdded = true;
            }

            if (rollAdded) {
                message.reply("You have been assigned a role on the Clicker Heroes Discord. Post a message in chat to see it.");
                log("added role");
            }

        }).catch(console.error);
}

function decodeSave(data) {

    if (data) {
        var saveData = Buffer.from(data.slice(32), 'base64');

        if (saveData) {
            try {
                if (data.startsWith("7a990")) {
                    saveData = zlib.inflateSync(saveData).toString();
                }
                else if (data.startsWith("7e8bb")) {
                    saveData = zlib.inflateRawSync(saveData).toString();
                }
            }
            catch {
                saveData = 'FAILURE';
            }

            return saveData;
        }
    }
}


bot.once(Events.ClientReady, c => {
    log(`${c.user.username} is online!`);
});


bot.on(Events.MessageCreate, message => {
    if (message.author.bot) return;
    var memberJoinTime;

    if (message.member) {
        memberJoinTime = message.member.joinedTimestamp;
    };

    var currentTime = Date.now();

    //DM REQUESTING SAVE CODE
    if (message.channel.isDMBased()) {
        if (bannedFromRoles.bannedFromRoles.includes(message.author.id)) {
            message.reply("Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.");
        }
        else {
            if (bannedFromRoles.bannedFromRoles.includes(message.author.id)) {
                message.reply("Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.");
            }
            else {
                log("received DM");
                if (message.attachments.first()) {
                    let name = message.attachments.first().name;
                    if (name.includes('.txt')) {
                        const uploadDir = path.join(__dirname, 'uploads');
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir);
                        }

                        request.get(message.attachments.first().url)
                            .on('error', console.error)
                            .pipe(fs.createWriteStream(path.join(uploadDir, name)))
                            .on('finish', function () {
                                fs.readFile(path.join(uploadDir, name), "utf8", (err, data) => {
                                    var save = ""

                                    if (data.includes("7a990") || data.includes("7e8bb")) {
                                        save = decodeSave(data);
                                        if (save == "FAILURE") {
                                            message.reply("Your save could not be read, be sure to copy the full text of the save file and try again.")
                                        }
                                        else {
                                            var userBanned = false;
                                            var highestHeroUnlocked = getHighestHeroUnlocked(save);
                                            var rubies = save.rubies;
                                            var gameUID = save.uniqueId;

                                            var targetMember = bot.guilds.cache.get("104739787872694272").members.cache.get(message.author.id);

                                            for (var i = 0; i < JSONsaves['saves'].length; i++) {
                                                if (JSONsaves['saves'][i].gameUID) {
                                                    if (userBanned == false && (JSONsaves['saves'][i].gameUID == gameUID && JSONsaves['saves'][i].userID != message.author.id) || rubies > 15000) {
                                                        userBanned = true;
                                                        bannedFromRoles.bannedFromRoles.push(message.author.id);
                                                        var edited_bannedFromRoles = JSON.stringify(bannedFromRoles);
                                                        fs.writeFileSync(__dirname + '/bannedFromRoles.json', edited_bannedFromRoles);
                                                        message.reply("Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.");

                                                        if (targetMember) {
                                                            targetMember.roles.set([]);
                                                        }
                                                    }
                                                }
                                            }

                                            if (userBanned == false && !bannedFromRoles.bannedFromRoles.includes(message.author.id)) {
                                                JSONsaves['saves'].push({ "userID": message.author.id, "gameUID": gameUID, "save": data });
                                            }
                                            else {
                                                JSONBannedsaves['saves'].push({ "userID": message.author.id, "gameUID": gameUID, "userBanned": userBanned, "save": data });
                                            }
                                            setRole(highestHeroUnlocked, message);
                                        }
                                    }
                                });

                                fs.unlink(path.join(uploadDir, name), err => {
                                    if (err) console.error('Failed to clean up upload:', err);
                                });
                            });
                    }
                }
            }
        }
    }

    if (message.channel.id == 104740000591024128 && !message.content.toLowerCase().startsWith("recruiting:")) {
        log(message.content);
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {

            let messageText = `<@${message.member.id}> Hey, it appears you posted in <#104740000591024128> without proper format or posted a non recruitment post.\n<#104740000591024128> is only for clans actively searching for members. If you are looking for a clan reach out to the clan leaders who have posted there.\nIf your post was a recruitment post, make sure to start it with "Recruiting:"`
            message.member.send(messageText + "\n\n Message Copy: " + message.content)
                .catch(() => {
                    var channel = bot.channels.cache.get("260159911822884866")
                    channel.send(messageText);
                })

            message.delete();
        }
    }

    //Auto mod stuff




    if (!message.channel.isDMBased()) {
        if (message.guild.id == guildId) {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                getNumberOfRoles(message.author.id)
                    .then((numRoles) => {
                        var lowercaseMessage = message.content.toLowerCase();
                        if ((lowercaseMessage.includes("@everyone") || lowercaseMessage.includes("free") || lowercaseMessage.includes("steam") || lowercaseMessage.includes("airdrop")) && (lowercaseMessage.includes("nitro") || lowercaseMessage.includes("nltro")) && (message.embeds.length > 0 || lowercaseMessage.includes("https:/"))) {
                            var messageContent = message.content;
                            var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");
                            message.delete();
                            message.member.ban({ days: 7, reason: 'posting nitro scam' })
                                .then(console.log)
                                .catch(console.error);

                            auditChannel.send({ content: `Banned <@${message.member.id}> for posting nitro scam. Message content: \`\`\`${messageContent}\`\`\`` })
                        }
                    });
            }

            if (message.content.toLowerCase().includes("discord.gg")) {
                var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");
                if (memberJoinTime > currentTime - 43200000) {
                    message.delete();
                    log("Link posted by " + message.author.username);
                    message.member.send("Do not post links to other Discord Servers")
                        .then(console.log)
                        .catch(console.error);

                    auditChannel.send({ contnet: `Warned <@${message.member.id}> for posting links to a different Discord server.` })
                }
            }

            if (message.content.includes("Checkout this game I am playing https://play.google.com")) {
                message.delete();
            }

            if (memberJoinTime > currentTime - 43200000) {
                var autoBanWords = ["nigger", "nigga", "jew", "n1gger", "n!gger"];
                var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");

                for (i = 0; i < autoBanWords.length; i++) {
                    if (message.content.toLowerCase().includes(autoBanWords[i])) {
                        var messageContent = message.content;
                        message.delete();

                        message.member.send("You have been banned from the Clicker Heroes Discord for posting racist comments.")
                            .then(console.log)
                            .catch(console.error);

                        message.member.ban({ days: 7, reason: 'Posted racist comments' })
                            .then(console.log)
                            .catch(console.error);


                        auditChannel.send({ content: `Banned <@${message.member.id}> for posting racist comments. Message content: \`\`\`${messageContent}\`\`\`` })
                    }
                }

                if (userMessageHistory[message.author.id]) {
                    userMessageHistory[message.author.id].push(currentTime);

                    if (userMessageHistory[message.author.id].length > 6) {
                        userMessageHistory[message.author.id] = userMessageHistory[message.author.id].slice(-6);

                        if (userMessageHistory[message.author.id][0] - userMessageHistory[message.author.id][5] > -8000) {
                            if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
                            var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");

                            var messageContent = message.content;
                            message.delete();

                            message.member.send("You have been banned for spamming")
                                .then(console.log)
                                .catch(console.error);

                            message.member.ban({ days: 7, reason: 'spamming' })
                                .then(console.log)
                                .catch(console.error);

                            auditChannel.send({ content: `Banned <@${message.member.id}> for spamming (posting 6 messages within 8 seconds) Message content: \`\`\`${messageContent}\`\`\`` })
                        }
                    }
                }
                else {
                    userMessageHistory[message.author.id] = [currentTime];
                }
            }

            var channel = message.channel.id;
            if (channelsPosttedIn[message.author.id]) {
                let user = channelsPosttedIn[message.author.id];
                let keys = Object.keys(user);

                user[channel] = currentTime;

                if (keys.length > 3) {
                    delete user[keys[0]];
                    keys = Object.keys(user);
                }

                let messageHistory = [];
                keys.forEach(key => messageHistory.push(user[key]));
                var sortedHistory = messageHistory.sort((a, b) => a - b);
                console.log(sortedHistory);

                if (sortedHistory[0] - sortedHistory[3] > -10000) {
                    console.log("posting too fast");

                    if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

                    var auditChannel = message.guild.channels.cache.find(channel => channel.name === "audit-log");
                    message.delete();

                    message.member.send("You have been banned for spamming")
                        .then(console.log)
                        .catch(console.error);

                    message.member.ban({ days: 7, reason: 'spamming' })
                        .then(console.log)
                        .catch(console.error);

                    auditChannel.send({ content: `Banned <@${message.member.id}> for spamming (posting to 4 different channels within 10 seconds). Message content: \`\`\`${message.content}\`\`\`` })
                }
            }
            else {
                channelsPosttedIn[message.author.id] = { [channel]: currentTime };
            }
        }
    }
});


bot.on('error', console.error)

bot.login(token);

