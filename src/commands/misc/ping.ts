import { Colors, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";

export const command: SlashCommand = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Displays the bot's ping."),
        
    execute: async (interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Purple)
                    .setDescription(`Pong!\nPing: ${interaction.client.ws.ping}`)
            ]
        });
    }
};