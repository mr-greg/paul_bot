import { Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../types";
import { guildMavId } from "../../../config.json";

export const command: SlashCommand = {
    name: 'rules_roles',
    data: new SlashCommandBuilder()
        .setName('rules_roles')
        .setDescription('Envoie de l\'embed de bienvenue. (règle & roles)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('Le salon dans lequel sera envoyé l\'embed.')
                .setRequired(true)
            )
        .addChannelOption(option =>
            option.setName('tuto-java')
                .setDescription('Sélectionner le salon des tutoriels java')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('tuto-bedrock')
                .setDescription('Sélectionner le salon des tutoriels java')
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
        let channelJava = interaction.options.getChannel('tuto-java').id;
        let channelBedrock = interaction.options.getChannel('tuto-bedrock').id;

        const embed = new EmbedBuilder()
            .setTitle('Bienvenue sur le serveur !')
            .setColor(Colors.White)
            .setThumbnail('https://i.imgur.com/uPGeLNp.png')
            .addFields(
                { name: 'Règlement :', value: '<:dot:808839441229021214> Soyez pas débile, faites preuve de bon sens\n', inline: false},
                { name: `Aide tutoriel Minecraft`, value: `<:dot:808839441229021214> Aide Minecraft JAVA : <#${channelJava}>\n<:dot:808839441229021214> Aide Minecraft BEDROCK : <#${channelBedrock}>`},
            )
        ;
        
        await channelToSend.send({ embeds: [embed] }).then( () => {
            interaction.reply({ content: 'Fait!', ephemeral: true })
        });
    }
}