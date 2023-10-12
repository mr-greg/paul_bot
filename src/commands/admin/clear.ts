import { Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: 'clear',
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear un nombre X de messages dans le salon actuel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(option =>
            option.setName('quantite')
                .setDescription('Le nombre de msg à supprimer')
                .setMaxValue(98)
                .setMinValue(1)
                .setRequired(true)
        )
        .addUserOption(option => 
            option.setName('cible')
                .setDescription('Cible uniquement les msg d\'un utilisateur')
                .setRequired(false)
        ),

    async execute(interaction) {
        if (!interaction.inGuild) {
            interaction.reply({ content: 'only in guild' })
            return;
        }

        const salon = interaction.channel;
        const amount = interaction.options.getNumber('quantite');


        const messages = await salon.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(Colors.Purple)
        
        if (interaction.options.getUser('cible') != null) {
            const target = interaction.options.getUser('cible');
            if (target.username === 'zaack' || 'telisnir') return;

            let i = 0;
            const filtered = [];

            messages.filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await salon.bulkDelete(filtered).then(messages => {
                res.setDescription(`${messages.size} messages de ${target} supprimés avec succès.`);
                interaction.reply({ embeds: [res], ephemeral: true});
            });
        } else {
            await salon.bulkDelete(amount, true).then(messages => {
                res.setDescription(`${messages.size} messages supprimés avec succès.`);
                interaction.reply({ embeds: [res], ephemeral: true});
            })
        }

    }
    
}