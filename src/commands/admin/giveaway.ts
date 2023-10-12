import { Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { guildMavId } from "../../../config.json";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: 'giveaway_text',
    data: new SlashCommandBuilder()
        .setName('giveaway_text')
        .setDescription('Envoie de l\'embed de giveaway. (explications)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('Le salon dans lequel sera envoyé l\'embed.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('date_fin')
            .setDescription('date du tirage pour le giveaway')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('prize')
            .setDescription('récompense du giveaway')
            .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.guildId != guildMavId) {
            interaction.reply({ content: 'Cette commande est unique au serveur Zaack', ephemeral: true})
            return;
        }
        if (!interaction.inGuild) {
            interaction.reply({ content: 'only in guild' })
            return;
        }

        let channelToSend: TextChannel = interaction.options.getChannel('salon');

        let dateFin = interaction.options.getString("date_fin");
        let prize = interaction.options.getString("prize");

        const embed = new EmbedBuilder()
            .setTitle('Participer au giveaway !')
            .setColor(Colors.White)
            .setThumbnail('https://i.imgur.com/uPGeLNp.png')
            .addFields(
                { name: 'Règlement :', value: 'A chaque fois que <@281570140888367114> ou <@156432016714366976> lance un stream, vous avez la possibilité de récupérer *(avec 100 points de chaîne)* un **ticket de participation**.\nIl y a un total de __3 tickets de giveaway__ par stream *(1 par personne par stream)*.\nChaque ticket vous offre une chance de remporter le giveaway du mois.', inline: false},
                { name: `Ce mois-ci :`, value: `<:dot:808839441229021214> Récompense : **${prize}**\n <:dot:808839441229021214>Fin le : **${dateFin}**`},
            );
        
        await channelToSend.send({ embeds: [embed] }).then( () => {
            interaction.reply({ content: 'Fait!', ephemeral: true })
        });
    }
}