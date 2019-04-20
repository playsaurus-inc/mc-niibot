const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let botmessage = args.join(" ");
    message.channel.send("Its almost like " + botmessage + " is subjective.");

}

module.exports.help = {
    name: "subjective"
}