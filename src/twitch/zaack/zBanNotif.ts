import { StaticAuthProvider } from "@twurple/auth";
import { Bot } from "@twurple/easy-bot";
import { Config, JsonDB } from "node-json-db";
import { appTwitchClientId } from "../../../config.json";
import { accessToken } from "../tokens.247367760.json";

export function zBanNotif() {
  const authProvider = new StaticAuthProvider(appTwitchClientId, accessToken);

  const bot = new Bot({
    authProvider,
    channels: ["zaacklachevre"],
  });

  bot.onBan(async (e) => {
    
    var db = new JsonDB(new Config("giveawayDb", true, true, "/"));
    var indicesToDelete: number[] = [];

    for (let i = 0; i < (await db.count("/giveaway")); i++) {
      if ((await db.getData(`/giveaway[${i}]`)) === e.userId) {
        indicesToDelete.push(i);
      }
    }

    for (let i = indicesToDelete.length - 1; i >= 0; i--) {
      await db.delete(`/giveaway[${indicesToDelete[i]}]`);
    }
  });
}
