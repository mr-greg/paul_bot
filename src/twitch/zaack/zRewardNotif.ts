import { StaticAuthProvider } from "@twurple/auth";
import { PubSubClient } from "@twurple/pubsub";
import { Config, JsonDB } from "node-json-db";
import { appTwitchClientId, ztwitchChannelId } from "../../../config.json";
import { accessToken } from '../tokens.247367760.json';



export function zRewardNotif() {
    const authProvider = new StaticAuthProvider(
        appTwitchClientId,
        accessToken
    );

    var db = new JsonDB(new Config("giveawayDb", true, true, '/'));

    // PubSub
    const pubSubClient = new PubSubClient({ authProvider });
    const handler = pubSubClient.onRedemption(ztwitchChannelId, (message) => {
        console.log('id reward : ' + message.rewardId);
        
        if (message.rewardId == "d0b558a1-7136-4bfa-87cc-d9e7a50710f4") {
        console.log("oe");
        db.push("/giveaway[]", message.userId, false);
        console.log(message.userId);
        } else console.log("no");
    });
}