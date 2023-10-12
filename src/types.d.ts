import { Events, CommandInteraction, SlashCommandBuilder, Collection, SharedSlashCommandOptions, SlashCommandChannelOption, ChannelManager, ChatInputCommandInteraction } from "discord.js"; // Imports necessary modules from "discord.js"

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args) => void
}

export interface SlashCommand {
    name: string,
    data: Collection<SlashCommandBuilder>,
    async execute: (interaction: ChatInputCommandInteraction) => Promise<void> // Async function to execute the command
}
export {} // Exports an empty object to indicate the end of the module