// Import necessary modules from libraries
import { ActivityType, Client, Collection, GatewayIntentBits } from "discord.js"; // Imports the Client and Collection classes from the "discord.js" library
import { token } from "../config.json"; // Imports the authentication token from the "config.json" file
import { BotEvent, SlashCommand } from "./types"; // Imports custom types "BotEvent" and "SlashCommand" from the "types" folder
import path from "path"; // Imports the "path" module to manage file paths
import fs, { PathLike } from "fs"; // Imports the "fs" module to handle file operations


// Create a new client instance
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
    presence: {
        activities: [{
            name: 'salu',
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/zaacklachevre'
        }]
    }
});

// Create a collection to store slash commands
client.slashCommands = new Collection();


// Set the path to the folder containing commands
const foldersPath: PathLike = path.join(__dirname, 'commands');
// Read the list of folders in the specified path
const commandFolders: string[] = fs.readdirSync(foldersPath);

// Iterate through each command folder
for (const folder of commandFolders) {
    // Set the full path to the current commands folder
    const commandsPath: PathLike = path.join(foldersPath, folder);
    // Read the list of command files in the folder
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Iterate through each command file in the folder
    for (const file of commandFiles) {
        // Set the full path to the current command file
        const filePath: PathLike = path.join(commandsPath, file);
        // Import the "command" object from the command file
        const { command }: { command: SlashCommand } = require(filePath);
    
        // Check if the "command" object contains the "data" and "execute" properties
        if ('data' in command && 'execute' in command) {
            // Add the command to the collection of slash commands
            client.slashCommands.set(command.data.name, command);
        } else {
            // Display a warning if the command is incomplete
            console.log(`[WARNING] The command in ${filePath} is missing the required "data" or "execute" properties.`);
        }
    }
}

// Set the path to the folder containing events
const eventsPath: PathLike = path.join(__dirname, 'events');
// Read the list of event files in the folder
const eventFiles: string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Iterate through each event file
for (const file of eventFiles) {
    // Set the full path to the current event file
    const filePath: PathLike = path.join(eventsPath, file);
    // Import the "event" object from the event file
    const { event }: { event: BotEvent } = require(filePath);

    // Associate the event execution with the Discord client's event
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Connect and authenticate the client using the provided token
client.login(token);