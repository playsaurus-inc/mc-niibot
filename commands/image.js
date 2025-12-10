const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const util = require('util');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('select from a catered list of images to post')
		.addStringOption((option) =>
			option
				.setName('query')
				.setDescription('image to search for')
				.setAutocomplete(true),
		),

	async autoComplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = {
			numberwang:
				'https://tenor.com/view/numberwang-thatsnumberwang-thatmitchellandwebblook-gif-7985932',
			ha: 'http://media.tumblr.com/tumblr_lwhcchZYDv1qdetkro1_500.jpg',
			haha: 'http://pictures.mastermarf.com/blog/2011/110226-laugh.jpg',
			fingerguns: 'https://i.imgur.com/NLwQBFV.png',
			hm: 'http://i.imgur.com/1sdt3QE.gifv',
			iguess: 'https://i.imgur.com/G1F1ECN.png',
			fucked: 'https://i.ytimg.com/vi/eh0mDYfTCtE/maxresdefault.jpg',
			fuck: 'https://imgur.com/a/AUYFeun',
			fish: 'http://i.imgur.com/5iCpnvM.png',
			dumstered: 'https://media.giphy.com/media/9w4omxSdj5rSo/giphy.gif',
			it: 'https://www.resolvetech.co.uk/wp-content/uploads/2016/01/Hello-IT-Have.jpg',
			abe: 'https://media.giphy.com/media/fDO2Nk0ImzvvW/giphy.gif',
			angry:
				'https://cdn.discordapp.com/attachments/104739787872694272/575381295912189960/AngryCidNoises.png',
			alot: 'http://thewritepractice.com/wp-content/uploads/2012/05/Alot-vs-a-lot1-600x450.png',
			ants: 'https://imgur.com/MWg8sz0',
			bait1:
				'https://s-media-cache-ak0.pinimg.com/736x/a3/e6/c1/a3e6c10155f5b255a7f1916c0419ee67.jpg',
			bait2: 'https://i.gyazo.com/63be20c9e37dd6042a87f6fba70dfd16.png',
			bait3: 'https://media.giphy.com/media/srTYyZ1BjBtGU/giphy.gif',
			banne: 'https://gfycat.com/BountifulAmpleAffenpinscher',
			banned: 'https://imgflip.com/i/1bfvul',
			bee: 'https://imgur.com/cvLayuf',
			borsh:
				'https://cdn.discordapp.com/attachments/204337434563969024/242094180363403264/point75lord.png',
			clown:
				'https://cdn.discordapp.com/attachments/683185506976268290/849306360323768400/unknown.png',
			delet: 'https://imgur.com/ccma3VM',
			fewer: 'https://i.imgur.com/Qb0eIjz.gifv',
			facepalm: 'http://i.imgur.com/68yp673.jpg',
			gud: 'https://imgur.com/9AKDl3R',
			language: 'https://i.imgur.com/DAjvol6.jpg',
			neat: 'http://i0.kym-cdn.com/entries/icons/original/000/015/044/b5f.jpg',
			notok: 'http://i.imgur.com/Du2IwBF.png',
			nerd: 'http://giphy.com/gifs/nerd-reaction-the-simpsons-OMK7LRBedcnhm',
			magic: 'http://i.imgur.com/YsbKHg1.gif',
			popcorn:
				'https://giphy.com/gifs/eating-michael-jackson-thriller-iLgbO6Y4EoRc4',
			pst: 'https://i.imgur.com/sP1Vj7j.jpg',
			reference: 'http://i.imgur.com/XS5LK.gif',
			rip: 'https://cdn.discordapp.com/attachments/260159911822884866/983516353321377792/unknown.png',
			salty:
				'You right now https://upload.wikimedia.org/wikipedia/commons/a/a2/Salt_mine_0096.jpg',
			shame: 'https://i.imgur.com/9Ox4xBK.gif',
			soon: 'https://i.imgur.com/klzVsIJ.png',
			stop: 'https://giphy.com/gifs/BYhoMtJMQsYVy',
			sure: 'http://www.reactiongifs.com/r/2013/06/I-dont-believe-you.gif',
			tldr: 'https://cdn.discordapp.com/attachments/259897497554649098/732022539576016896/main-qimg-0995fc35572e8eb49818519996b41357.png',
			watman:
				'https://pygospasprofession.files.wordpress.com/2013/07/watman.jpg',
			well: 'http://i.imgur.com/U5ISRyL.gifv',
			whoosh: 'https://i.imgur.com/axJmn.gif',
			um: 'https://i.imgur.com/YAGpXPd.png',
		};

		const filtered = Object.keys(choices).filter((choice) =>
			choice.startsWith(focusedValue),
		);

		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choices[choice] })),
		);
	},

	async execute(interaction) {
		await interaction.reply({
			content: interaction.options._hoistedOptions[0].value,
		});
	},
};
