import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('areyouhappy')
		.setDescription("annoying pings the users asking if they're happy")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('the user to ping')
				.setRequired(true),
		),

	async execute(interaction) {
		const { channel, options } = interaction;
		const user = options.getUser('user', true);

		if (!channel?.isSendable()) return;

		await interaction.reply({ content: 'sending pings', ephemeral: true });

		setTimeout(() => {
			channel.send(`${user} are`).catch(console.error);
		}, 1000);
		setTimeout(() => {
			channel.send(`${user} you`).catch(console.error);
		}, 2000);
		setTimeout(() => {
			channel.send(`${user} happy`).catch(console.error);
		}, 3000);
		setTimeout(() => {
			channel.send(`${user} now`).catch(console.error);
		}, 4000);
		setTimeout(() => {
			channel.send(`${user} ?`).catch(console.error);
		}, 5000);
	},
};
