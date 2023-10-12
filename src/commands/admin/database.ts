import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Config, JsonDB } from "node-json-db";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: 'giveawaydb',
    data: new SlashCommandBuilder()
        .setName('giveawaydb')
        .setDescription('Envoie la database giveaway actuelle à Zaack en MP')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
               
    async execute(interaction) {
        if (interaction.user.id != '281570140888367114') return;

        const zaack = interaction.user;
        var db = new JsonDB(new Config("giveawayDb", true, true, '/'));
        var data = await db.getData("/giveaway");
        
        interaction.user.send('Here is your data :\n' + data);
        interaction.reply({ content: 'check dm', ephemeral: true});
    }
    
}