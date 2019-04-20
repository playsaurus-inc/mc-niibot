const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

var counts = fs.readFileSync("counts.json");

var jsonCounts = JSON.parse(counts);

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

                var JSONcommands; 
                var HAILcommands;
                var reminders;

                var edited_commands = JSON.stringify(JSONcommands);
                var edited_HAILcommands = JSON.stringify(HAILcommands);
                var edited_reminders = JSON.stringify(reminders);

                fs.readFile('commands.json', (err, data) => {
                    if(err) throw err;
                    JSONcommands = JSON.parse(data);
                    });

                fs.readFile('hailCommands.json', (err, data) => {
                    if(err) throw err;
                    HAILcommands = JSON.parse(data);
                    });

                fs.readFile('remind.json', (err, data) => {
                    if(err) throw err;
                    reminders = JSON.parse(data);
                    });


bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`)
	bot.user.setActivity("Destroy All Humans!")

    function reReadFiles()
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

                for (i = 0; i < reminders.reminders.length; i ++) {

                    var currentTime = Date.now(); 

                    if (reminders.reminders[i].reminderDate <= currentTime && reminders.reminders[i].sent == false) {
                        bot.channels.get(reminders.reminders[i].channel).send("<@" + reminders.reminders[i].user + ">", {embed: {
                            title: "Reminder",
                            description: reminders.reminders[i].reminder,
                        }});

                        reminders.reminders[i].sent = true;
                    }
                    if (reminders.reminders[i].sent == true) {
                         reminders.reminders.splice(i, 1);

                        edited_reminders = JSON.stringify(reminders);
                        fs.writeFileSync('remind.json', edited_reminders)

                        fs.readFile('remind.json', (err, data) => {
                            if(err) throw err;
                            reminders = JSON.parse(data);
                        });
                    }
                }

                edited_commands = JSON.stringify(JSONcommands);
                edited_HAILcommands = JSON.stringify(HAILcommands);
                edited_reminders = JSON.stringify(reminders);
                
                fs.writeFileSync('remind.json', edited_reminders)
                fs.writeFileSync('commands.json', edited_commands);
                fs.writeFileSync('hailCommands.json', edited_HAILcommands);

         reReadFiles();

        }, 5000)
    };

    reReadFiles();
});

var prefixes = ["git ", "!", "\\", "/", "~", "<@260615392685326336> "]
var hailPrefixes = ["hail ", "Hail ", "HAIL "]

var helpQuestions = [
     "can anyone help me?",
     "can someone help me?", 
     "can someone please help me?",
     "can anyone please help me?",
     "Can anyone help me?",
     "Can someone help me?", 
     "Can someone please help me?",
     "Can anyone please help me?"
 ];


bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

    for (x = 0; x < helpQuestions.length; x++) {
    if (message.content.indexOf(helpQuestions[x]) !== -1) {
     message.channel.send("https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif")
     return;
     }
 }

    for (x = 0; x < HAILcommands.commands.length; x++) {
        for (i = 0; i < HAILcommands.commands[x].command.length; i++)   {
            for (n = 0; n < hailPrefixes.length; n++){
            if (message.content.startsWith(hailPrefixes[n] + HAILcommands.commands[x].command[i])) {
                HAILcommands.commands[x].count = HAILcommands.commands[x].count + 1; 
                message.channel.send("" + HAILcommands.commands[x].command[i] + " has been hailed " + HAILcommands.commands[x].count + " times! " + HAILcommands.commands[x].response);
                return;
                }
            }
        }
    }

	for (x = 0; x < JSONcommands.commands.length; x++) {
		for (i = 0; i < JSONcommands.commands[x].command.length; i++)	{
			for (n = 0; n < prefixes.length; n++){
			if (message.content.toLowerCase().startsWith(prefixes[n] + JSONcommands.commands[x].command[i])) {
				message.channel.send("" + JSONcommands.commands[x].response);
				return;
				}
			}
		}
	}

	var Delay = [5000, 10000, 20000];

	function randomDelay()
            {
                return Math.floor((Math.random() * Delay.length));
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

	for (n = 0; n < prefixes.length; n++){
		if (message.content.startsWith(prefixes[n] + "slowpoke")) {
			var timer = Delay[randomDelay()];
			setTimeout(function() {message.channel.send("https://vignette4.wikia.nocookie.net/pokemon/images/b/b7/079Slowpoke_Dream.png/revision/latest?cb=20140820072339" + " \n slowpoke was " + timer/1000 + " seconds late" );}, timer);
			console.log(timer/1000);
			return;
			}

        if (message.content.startsWith(prefixes[n] + "remindme")) {


            //Grabs the content of the message inside ""
            if (message.content.includes("\"")){
                var messageArray2 = message.content.split("\""); 
                console.log(messageArray2);
            }

            if (messageArray2[1] === undefined || messageArray2[3] === undefined){
                message.reply("You are missing an argument");
                return;
            }

            //Converts the contents of the message into an array based on what was seperated by commas 
            var timeArray = messageArray2[3].split(",");
            console.log(timeArray);

            var reminderDate = 0;

            for(x = 0; x < msConversion.length; x++){
                //iterates through a specific supported times recognizable keyword/character to find a match
                for(i = 0; i < msConversion[x].time.length; i++){
                    //iterates through the list of times
                    for(n = 0; n < timeArray.length; n++){

                        //Seperates the time keyword from the number 
                        var regexStr = timeArray[n].match(/[a-z]+|[^a-z]+/gi);

                        //Checks if the keyword is the same length as a supported keyword 
                        if(regexStr[1].length == msConversion[x].time[i].length){
                            //then checks if the keyword is the same as a supported keyword
                            if(regexStr[1].toLowerCase().includes(msConversion[x].time[i]) > 0){
                                var ms = msConversion[x].MS;    
                                
                                //logs the converted MS to an array
                                reminderDate = reminderDate + (msConversion[x].MS * parseInt(regexStr[0]));
                            }
                        }
                    }
                }
            }
            reminderDate = reminderDate + Date.now();
            
            reminders['reminders'].push({"user":message.author.id,"channel":message.channel.id,"reminderDate":reminderDate,"reminder":messageArray2[1],"sent":false})

            console.log(reminders); 

            return;
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

    bot.on('guildMemberAdd', member => {
        _channel = member.guild.channels.get('104739787872694272');

        if(!_channel) return;

        _channel.send('**' + member.user.username + '** joined the server!'); 
    });

    bot.on('guildMemberRemove', member => {
        _channel = member.guild.channels.get('104739787872694272');

        if(!_channel) return;

        _channel.send('**' + member.user.username + '** left the server');
    });



bot.on('error', console.error)

bot.login(botconfig.token);

