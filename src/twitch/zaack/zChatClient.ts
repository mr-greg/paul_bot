import { ApiClient } from "@twurple/api";
import { appTwitchClientId, ztwitchChannelId } from "../../../config.json";
import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import { JsonDB, Config } from "node-json-db";
import { accessToken } from '../tokens.247367760.json';



export function zChatClient() {
  const authProvider = new StaticAuthProvider(
    appTwitchClientId,
    accessToken
  );

  // connecting to chat
  const chatClient = new ChatClient({
    authProvider,
    channels: ["zaacklachevre"],
  });
  chatClient.connect();

  const onMessage = chatClient.onMessage(async (channel, user, text, msg) => { 

    if (text == '!entry') {
      var entries = await entryCount(msg.userInfo.userId);
      chatClient.say("zaacklachevre", "Tu as " + entries + " participations pour le giveaway du mois !", {
        replyTo: msg
      });
    }
    if (text == "!giveaway") {
      chatClient.say("zaacklachevre", "A chaque début de stream, il y a un total de 3 tickets de giveaway à récupérer avec les points de chaîne (1 par personne par stream). Chaque ticket vous offre une chance de remporter le giveaway du mois. Pour en savoir plus sur les récompenses, rdv ici : https://discord.com/invite/5xPMmn4", {
        replyTo: msg
      });
    }

    if (text == '!resetGiveaway' && msg.userInfo.userId == ztwitchChannelId) {
      var db = new JsonDB(new Config("giveawayDb", true, true, '/'));
      await db.delete("giveawayDb/giveaway");
      chatClient.say("zaacklachevre", "Database reseted", {
        replyTo: msg
      });
      
    }

    if (text == '!winner' && msg.userInfo.userId == ztwitchChannelId) {
      var getUser = await drawGiveaway(authProvider).then( async (winner) => {
        if ( winner.id == "247367760" || "89168535" ) {
          chatClient.say("zaacklachevre", "Zaack ou Mafiou a remporté le giveaway, refait la commande couillon lol");
          return;
        }
        await winner.helix.whispers.sendWhisper("247367760", winner.id, "Tu as gagné le giveaway du mois ! DM zaack sur discord en MP avec une capture d'écran de ce message ! Félicitations :)");
        chatClient.say("zaacklachevre", "Le gagnant du giveaway est " + winner.pseudo + " ! Félicitation !")
        await db.delete("giveawayDb/giveaway");
        console.log('gagnant pseudo = ' + winner.pseudo + '\ngagnant id = ' + winner.id);
      });
    }
  })
}

export async function drawGiveaway(authProvider) {
  try {
    const helix = new ApiClient({ authProvider });
    var db = new JsonDB(new Config("giveawayDb", true, true, '/'));
    var data = await db.getData("/giveaway");

    const getRandomIndex = Math.floor(Math.random() * data.length);
    var randomIndex = data[getRandomIndex];

    var user = await helix.users.getUserById(randomIndex);

    var winner = {
      pseudo: user.displayName,
      id: user.id,
      user: user,
      helix: helix
    };

    return winner;
  } catch (error) {
    // Handle errors, e.g., log them or return a specific error object
    console.error(error);
    throw error; // Re-throw the error to indicate that it wasn't handled
  }
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
