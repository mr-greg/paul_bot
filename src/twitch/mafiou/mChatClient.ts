import { appTwitchClientId } from "../../../config.json";
import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import { JsonDB, Config } from "node-json-db";
import { accessToken } from '../tokens.89168535.json';


export function mChatClient() {
  const authProvider = new StaticAuthProvider(
    appTwitchClientId,
    accessToken
  );

  // connecting to chat
  const chatClient = new ChatClient({
    authProvider,
    channels: ["telisnir"],
  });
  chatClient.connect();


  const onMessage = chatClient.onMessage(async (channel, user, text, msg) => { 

    if (text == '!entry') {
      var entries = await entryCount(msg.userInfo.userId);
      chatClient.say("telisnir", "Tu as " + entries + " participations pour le giveaway du mois !", {
        replyTo: msg
      });
    }

    if (text == "!giveaway") {
      chatClient.say("telisnir", "A chaque début de stream, il y a un total de 3 tickets de giveaway à récupérer avec les points de chaîne (1 par personne par stream). Chaque ticket vous offre une chance de remporter le giveaway du mois. Pour en savoir plus sur les récompenses, rdv ici : https://discord.com/invite/5xPMmn4", {
        replyTo: msg
      });
    }
  })
}

export async function entryCount(id: string) {
  var db = new JsonDB(new Config("giveawayDb", true, true, '/'));
  var data = await db.getData("/giveaway");

  let count = 0;
  for (let i = 0; i < data.length; i++) {
      if (data[i] === id) {
          count++;
      }
  }
  return count;
}

