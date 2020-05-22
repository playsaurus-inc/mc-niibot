    const botconfig = require("./botconfig.json");
    const Discord = require("discord.js");
    const fs = require("fs");
    const bot = new Discord.Client({disableEveryone: true});
    bot.commands = new Discord.Collection();

    var JSONcommands; 
    var HAILcommands;
    var reminders;
    var fish;
    var auditlog;

    var prefixes = ["git ", "!", "\\", "/", "~", "<@260615392685326336> "];
    var hailPrefixes = ["hail ", "Hail ", "HAIL "];
    var startedFishGame = false;
    var nextFish;

    function log(log) {
        var time = new Date();
        console.log("[" + (time.getHours() % 12) + ":" + time.getMinutes() + ":" + time.getSeconds() + "] " + log);
    }

    fs.readdir("./commands/", (err, files) => {
        if(err) log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            log("Couldn't find commands.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/${f}`);
            log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });
    });

    var edited_reminders = JSON.stringify(reminders);

    fs.readFile('commands.json', (err, data) => {
        if(err) throw err;
        JSONcommands = JSON.parse(data);
        });

    fs.readFile('auditlog.json', (err, data) => {
        if(err) throw err;
        auditlog = JSON.parse(data);
        });

    fs.readFile('hailCommands.json', (err, data) => {
        if(err) throw err;
        HAILcommands = JSON.parse(data);
        });

    fs.readFile('remind.json', (err, data) => {
        if(err) throw err;
        reminders = JSON.parse(data);
        });

    fs.readFile('fish.json', (err, data) => {
        if(err) throw err;
        fish = JSON.parse(data);
        });

bot.on("ready", async () => {
    log(`${bot.user.username} is online!`)
    bot.user.setActivity("Destroy All Humans!")

    function readFilesAndUpdateRoles()
    {
        setTimeout(function() {

                fs.readFile('commands.json', (err, data) => {
                    if(err) throw err;
                    JSONcommands = JSON.parse(data);
                });

                fs.readFile('hailCommands.json', (err, data) => {
                    if(err) throw err;
                    HAILcommands = JSON.parse(data);
                });

                fs.readFile('fish.json', (err, data) => {
                    if(err) throw err;
                    fish = JSON.parse(data);
                });

                var reminder = reminders.reminders;

                for (i = 0; i < reminders.reminders.length; i ++) {

                    var currentTime = Date.now(); 

                    if (reminder[i].reminderDate <= currentTime && reminder[i].sent == false) {
                        bot.channels.get(reminder[i].channel).send("<@" + reminder[i].user + ">", {embed: {
                            title: "Reminder",
                            description: reminder[i].reminder,
                        }});

                        reminder[i].sent = true;
                    }

                    if (reminder[i].sent == true) {
                        reminder.splice(i, 1);

                        edited_reminders = JSON.stringify(reminders);
                        fs.writeFileSync('remind.json', edited_reminders)

                        fs.readFile('remind.json', (err, data) => {
                            if(err) throw err;
                            reminders = JSON.parse(data);
                        });
                    }

                }

                edited_reminders = JSON.stringify(reminders);
                
                fs.writeFileSync('remind.json', edited_reminders);

         readFilesAndUpdateRoles();

        }, 5000)
    };

    readFilesAndUpdateRoles();
});

function getFishTime(){
    nextFish = Math.floor(Math.random()*(1200000-300000)+300000);
    log("next fish in: " + Number.parseFloat(nextFish/60000).toFixed(2) + " mins");
    return nextFish;
}

bot.on("message", async message => {

	var memberJoinTime = message.member.joinedTimestamp;
    var currentTime = Date.now();


    if (message.guild) {
        if (message.guild.id == "104739787872694272"){
            let CHRole = message.guild.roles.get('587823606076014602');
            if (CHRole) {
                let CHRoleMembers = CHRole.members;
                CHRoleMembers.forEach(function(key, value) {
                    if (key.presence.game) {
                        if (key.presence.game.name.toString() !== "Clicker Heroes" && key.presence.game.name.toString() !== "Clicker Heroes 2"&& key.presence.game.name.toString() !== "ClickerHeroes2") {
                            key.removeRole('587823606076014602')
                        }
                    }
                    else
                    {
                        key.removeRole('587823606076014602')
                        console.log("removed role")
                    }
                })
            }
        }
    }

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var hailCommands = HAILcommands.commands;
    for (x = 0; x < hailCommands.length; x++) {
        for (i = 0; i < hailCommands[x].command.length; i++)   {
            for (n = 0; n < hailPrefixes.length; n++){
                if (message.content.startsWith(hailPrefixes[n] + hailCommands[x].command[i])) {
                        hailCommands[x].count = hailCommands[x].count + 1; 
                        message.channel.send("" + hailCommands[x].command[i] + " has been hailed " + hailCommands[x].count + " times! " + hailCommands[x].response);
                        edited_hailCommands = JSON.stringify(HAILcommands);
                        fs.writeFileSync('hailCommands.json', edited_hailCommands)
                        return;
                }
            }
        }
    }

    var commands = JSONcommands.commands;
    for (x = 0; x < commands.length; x++) {
        for (i = 0; i < commands[x].command.length; i++){
            for (n = 0; n < prefixes.length; n++){
                if (message.content.toLowerCase().startsWith(prefixes[n] + commands[x].command[i].toLowerCase())){
                    var commandToCheck = message.content.substr(prefixes[n].length, message.content.length);
                    if (commandToCheck.length == commands[x].command[i].length) {
                        message.channel.send("" + commands[x].response);
                        return;
                    }
                }
            }
        }
    }

    var msConversion = [
        {
          time: ['s','second','seconds','sec', 'secs'],
          MS: 1000,
        },
        {
          time: ['m','minute','minutes','min','mins'],
          MS: 60000,
        },
        {
          time: ['h','hour','hours'],
          MS: 3600000,
        },
        {
          time: ['d','day','days'],
          MS: 86400000,
        },
        {
          time: ['month','months'],
          MS: 2592000000,
        },
        {
          time: ['y','year','years','yrs'],
          MS: 946080000000,
        }
    ];

    var Delay = [5000, 10000, 20000];
    
    function randomDelay()
    {
        return Math.floor((Math.random() * Delay.length));
    }

    for (n = 0; n < prefixes.length; n++){

        if (message.content.startsWith(prefixes[n] + "slowpoke")) {
            var timer = Delay[randomDelay()];
            setTimeout(function() {message.channel.send("https://vignette4.wikia.nocookie.net/pokemon/images/b/b7/079Slowpoke_Dream.png/revision/latest?cb=20140820072339" + " \n slowpoke was " + timer/1000 + " seconds late" );}, timer);
            log(timer/1000);
            return;
            }

        if (message.content.startsWith(prefixes[n] + "remindme")) {

            if (message.content.includes("\"")){
                var messageArray2 = message.content.split("\""); 
                log(messageArray2);
            }

            if (messageArray2[1] === undefined || messageArray2[3] === undefined){
                message.reply("You are missing an argument");
                return;
            }

            var timeArray = messageArray2[3].split(",");
            log(timeArray);

            var reminderDate = 0;

            for(x = 0; x < msConversion.length; x++){
                for(i = 0; i < msConversion[x].time.length; i++){
                    for(n = 0; n < timeArray.length; n++){
                        var regexStr = timeArray[n].match(/[a-z]+|[^a-z]+/gi);

                        if(regexStr[1].length == msConversion[x].time[i].length){
                            if(regexStr[1].toLowerCase().includes(msConversion[x].time[i]) > 0){
                                var ms = msConversion[x].MS;    
                                reminderDate = reminderDate + (msConversion[x].MS * parseInt(regexStr[0]));
                            }
                        }
                    }
                }
            }
            reminderDate = reminderDate + Date.now();
            
            reminders['reminders'].push({"user":message.author.id,"channel":message.channel.id,"reminderDate":reminderDate,"reminder":messageArray2[1],"sent":false});
            message.reply("Your reminder has been set", {embed: {
                            title: "Reminder",
                            fields: [
                                {
                                    name: 'Date',
                                    value: new Date(reminderDate).toString(),
                                }, 
                                {
                                    name: 'Description',
                                    value: messageArray2[1],
                                }
                                ],
                        }});

            return;
        }
    }

    if (message.content.startsWith("m~rekt")) {
        message.member.kick()
    }

    if (message.content.includes("discord.gg")) {
        if(memberJoinTime > currentTime - 43200000)
        {
           message.delete();
           log("Link posted by " + message.author.username);
           message.member.send("Do not post links to other Discord Servers");
        }
    }
    
    let prefix = false;
    for(const thisPrefix of prefixes) {
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if(!prefix) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

});

    bot.on('presenceUpdate', (oldMember, newMember) => {
        if(newMember.presence.game) {
            if(newMember.presence.game.name.toString() == "Clicker Heroes" || newMember.presence.game.name.toString() == "Clicker Heroes 2" || newMember.presence.game.name.toString() == "ClickerHeroes2")
            {  
                if (!newMember.roles.has('587823606076014602'))
                {
                    newMember.addRole('587823606076014602');
                }
            }  
            else
            {
                if (newMember.roles.has('587823606076014602'))
                {
                    newMember.removeRole('587823606076014602');
                }
            }
        }
    });

bot.on('error', console.error)

bot.login(botconfig.token);

