import { appTwitchClientId, mtwitchChannelId } from "../../../config.json";
import { StaticAuthProvider } from "@twurple/auth";
import { PubSubClient } from "@twurple/pubsub";
import { JsonDB, Config } from "node-json-db";
import { accessToken } from '../tokens.89168535.json';


export function mRewardNotif() {
    const authProvider = new StaticAuthProvider(
        appTwitchClientId,
        accessToken
    );

    var db = new JsonDB(new Config("giveawayDb", true, true, '/'));

    // PubSub
    const pubSubClient = new PubSubClient({ authProvider });
    const handler = pubSubClient.onRedemption(mtwitchChannelId, (message) => {
        console.log('id reward : ' + message.rewardId);
        
        if (message.rewardId == "2eed165a-2d87-4a1e-aaeb-d45bbb1cf4fd") {
            console.log("oe");
            console.log(message.userId);
            db.push("/giveaway[]", message.userId, false);
        } else console.log("no");
    });
}