import { Colors, EmbedBuilder, Events, Message } from "discord.js";
import { BotEvent } from "../types";

export const event: BotEvent = {
    name: Events.MessageCreate,
    once: false,
    
    execute: async (message: Message) => {
        if (!message.content.startsWith('!', 0)) return;
        
        if (message.content == '!bfer') {
            const embed = new EmbedBuilder()
                .setColor(Colors.White)
                .setTitle('Ferme à fer Bedrock')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/fc/Iron_Ingot_JE3_BE2.png/revision/latest?cb=20230613175240')
                .setDescription('Debug ferme à fer bedrock edition, suit les étapes une par une, n\'hésites pas à attendre 5 minutes entre chacunes d\'elles afin de vérifier si la ferme se relance !')
                .setFooter({ text: `Message de : ${message.author.displayName}`})
                .addFields(
                    // jump line
                    {name: ' ', value: ' ', inline: false},
                    { name: '1 - Métier', value: 'Vérifie que tous tes villageois sont des fletchers, cela permet à la ferme de fonctionner 24/24, peu importe la météo !', inline: false },
                    // Jump line
                    {name: ' ', value: ' ', inline: false},
                    { name: '2 - Autour de la ferme', value: 'Vérifie que tu n\'ai pas de table de travail et/ou lits dans un rayon de 96 blocs autour de la ferme.', inline: false },
                    // Jump line
                    {name: ' ', value: ' ', inline: false},
                    { name: '3 - Reset de la ferme', value: 'Casse tous les lits, attends environ 10-20 secondes puis replace les.\n\nRemplace les tables d\'archerie par de la cobble/dirt. *(casse et remplace instantanément pour éviter toute fuite des villageois)*\n\nAttends 10-20 secondes *(environ, peu importe si tu attends +)* puis casse la dirt/cobble et remplace instantanément par des tables d\'archerie à nouveau.\nAssure-toi qu\'il n\'y ait **que 20 tables d\'archerie au total**.\nLaisse le reste avec n\'importe quel bloc qui ne soit pas une table de métier !', inline: false }
                );
            
            message.channel.send({ embeds: [embed] });
        }
    }
}