import { CommandInteraction, CacheType } from "discord.js"; // Imports necessary modules from "discord.js"
import { BotEvent, SlashCommand } from "../types"; // Imports custom types "BotEvent" and "SlashCommand" from the "../types" file

const { Events } = require('discord.js'); // Imports the Events class from the 'discord.js' library

// Defines an event handler for when interactions (commands) are created
export const event: BotEvent = {
    name: Events.InteractionCreate, // Specifies the event name as "InteractionCreate"
    execute: async (interaction: CommandInteraction<CacheType>) => {
        // Checks if the interaction is a chat input command
        if (!interaction.isChatInputCommand()) return;

        // Retrieves the corresponding slash command using the command name
        const command: SlashCommand = interaction.client.slashCommands.get(interaction.commandName);

        // Checks if a matching command was found
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            return;
        }
        
        try {
            // Executes the command's execute function with the interaction as an argument
            await command.execute(interaction);
        } catch (error) {
            // Handles errors that occur during command execution
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    }
};