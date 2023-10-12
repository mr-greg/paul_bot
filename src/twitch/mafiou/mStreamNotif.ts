import { appTwitchClientId, mtwitchChannelId } from "../../../config.json";
import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { Client, TextChannel } from "discord.js";
import { accessToken } from '../tokens.89168535.json';


export function mStreamNotif(streamAnnonce: TextChannel) {
    const authProvider = new StaticAuthProvider(
        appTwitchClientId,
        accessToken
    );

    const apiClient = new ApiClient({ authProvider });
    const listener = new EventSubWsListener({ apiClient });
    listener.start();

    const onGoLiveSub = listener.onStreamOnline(mtwitchChannelId, (e) => {
        console.log(`${e.broadcasterDisplayName} est en live !`);
        if (!streamAnnonce.isTextBased()) return;
        streamAnnonce.send("**Hello !** <a:Pikachu_Hello:1154586459265839134>\n<@156432016714366976> est en stream !\nFoncez récupérer votre ticket d\'entrée pour le **giveaway** du mois !\nhttps://twitch.tv/telisnir");
    });

    const onGoOfflineSub = listener.onStreamOffline(mtwitchChannelId, (e) => {
      console.log(`${e.broadcasterDisplayName} est hors ligne !`);
    });
}

export function getStreamAnnonceChannel(client: Client): TextChannel {
    return client.channels.cache.get('1145374860663599104') as TextChannel;
}
