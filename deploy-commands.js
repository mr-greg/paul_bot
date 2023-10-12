const { REST, Routes } = require('discord.js');
const { clientId, guildMavId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = []; // Initializes an array to store command data

const foldersPath = path.join(__dirname, 'dist/src/commands'); // Specifies the path to the 'commands' folder
const commandFolders = fs.readdirSync(foldersPath); // Reads the list of folders in the 'commands' directory

// Iterates through each command folder
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder); // Specifies the path to a specific command folder
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filters for '.js' files in the command folder

    // Iterates through each command file
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file); // Specifies the path to a specific command file
        
        // Imports the 'command' object from the command file
        const { command } = require(filePath);
        
        commands.push(command.data.toJSON()); // Converts command data to JSON format and adds it to the 'commands' array
    }
}

const rest = new REST().setToken(token); // Initializes the REST API with the provided token

// Asynchronous function to refresh application commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        console.log(commands);

        // Sends a PUT request to update application commands for a specific guild
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildMavId),
            { body: commands },
        );
        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();