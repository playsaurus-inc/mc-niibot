const Discord = require("discord.js");
const https = require('https');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath("c:\\program files\\ffmpeg\\bin\\ffmpeg.exe");
ffmpeg.setFfprobePath("c:\\program files\\ffmpeg\\bin\\ffprobe.exe");
ffmpeg.setFlvtoolPath("c:\\program files\\ffmpeg\\bin\\ffprobe.exe");

//still needs more work to get higher res videos and to work with videos with out audio

module.exports.run = async (bot, message, args) => {


	if(!args[0]) return message.channel.send("you forgot to include a link");
	if(args[0].startsWith("https://v.redd.it/")){

		const video = fs.createWriteStream("video.mp4");
		var requestVideo = https.get(args[0] + "/DASH_480", function(response) {
		  response.pipe(video);
		});

		const audio = fs.createWriteStream("audio.mp4");
		var requestAudio = https.get(args[0] + "/audio", function(response) {
		  response.pipe(audio);
		});

		video.on('finish', function() {
			new ffmpeg('video.mp4')
				.addInput('audio.mp4')
				.on('error', function(err) {
				console.log('An error occurred: ' + err.message);
				})
				.on('end', function() {
				console.log('Final video created!');
				message.channel.send("Converted for Discord Embed", {files:["output.mp4"]})
				})
				.saveToFile('output.mp4')
		});
	}
}

module.exports.help = {
	name: "vreddit"
}