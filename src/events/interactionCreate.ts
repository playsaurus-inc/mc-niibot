import * as Sentry from '@sentry/node';
import { type Interaction, MessageFlags } from 'discord.js';

export async function onInteractionCreate(
	interaction: Interaction,
): Promise<void> {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`,
			);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			Sentry.captureException(error, {
				extra: { command: interaction.commandName },
			});

			const content = 'There was an error while executing this command!';
			if (interaction.replied || interaction.deferred) {
				await interaction
					.followUp({ content, flags: MessageFlags.Ephemeral })
					.catch(console.error);
			} else {
				await interaction
					.reply({ content, flags: MessageFlags.Ephemeral })
					.catch(console.error);
			}
		}
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`,
			);
			return;
		}

		try {
			await command.autoComplete?.(interaction);
		} catch (error) {
			console.error(error);
			Sentry.captureException(error, {
				extra: { command: interaction.commandName },
			});
		}
	}
}
