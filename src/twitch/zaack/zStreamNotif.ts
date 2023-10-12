import { ApiClient } from "@twurple/api";
import { StaticAuthProvider } from "@twurple/auth";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { Client, TextChannel } from "discord.js";
import { appTwitchClientId, ztwitchChannelId } from "../../../config.json";
import { accessToken } from '../tokens.247367760.json';


export function zStreamNotif(streamAnnonce: TextChannel) {
    const authProvider = new StaticAuthProvider(
        appTwitchClientId,
        accessToken
    );

    const apiClient = new ApiClient({ authProvider });
    const listener = new EventSubWsListener({ apiClient });
    listener.start();

    const onGoLiveSub = listener.onStreamOnline(ztwitchChannelId, (e) => {
        console.log(`${e.broadcasterDisplayName} est en live !`);
        if (!streamAnnonce.isTextBased()) return;
        streamAnnonce.send("**Hello !** <a:Pikachu_Hello:1154586459265839134>\n<@281570140888367114> est en stream !\nFoncez récupérer votre ticket d\'entrée pour le **giveaway** du mois !\nhttps://twitch.tv/zaacklachevre");
    });

    const onGoOfflineSub = listener.onStreamOffline(ztwitchChannelId, (e) => {
      console.log(`${e.broadcasterDisplayName} est hors ligne !`);
    });
}

export function getStreamAnnonceChannel(client: Client): TextChannel {
    return client.channels.cache.get('1145374860663599104') as TextChannel;
}
