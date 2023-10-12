import { Events, Client } from "discord.js";
import { BotEvent } from "../types";
import { getStreamAnnonceChannel, zStreamNotif } from "../twitch/zaack/zStreamNotif";
import { zRewardNotif } from "../twitch/zaack/zRewardNotif";
import { zChatClient } from "../twitch/zaack/zChatClient";
import { mChatClient } from "../twitch/mafiou/mChatClient";
import { mRewardNotif } from "../twitch/mafiou/mRewardNotif";
import { mStreamNotif } from "../twitch/mafiou/mStreamNotif";
import { JsonDB, Config } from "node-json-db";
import { mRefreshTwitch, zRefreshTwitch } from "../twitch/refreshToken";
import { mBanNotif } from "../twitch/mafiou/mBanNotif";
import { zBanNotif } from "../twitch/zaack/zBanNotif";


export const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  execute: async (client: Client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const streamAnnonce = getStreamAnnonceChannel(client);

    // twitch zaack
    zRefreshTwitch();
    zRewardNotif();
    zChatClient();
    zBanNotif();
    zStreamNotif(streamAnnonce);

    // twitch mafiou
    mRefreshTwitch();
    mChatClient();
    mRewardNotif();
    mBanNotif();
    mStreamNotif(streamAnnonce);

  },
};
