# Using my [TypeScript Template](https://github.com/mr-greg/DiscordJS_TypeScript-Template) for DiscordJS


This is a simple TypeScript template for the [discordjs library](https://discord.js.org).

## Features

- Ready to use package.json
- Simple ping command example
- Simple ready event example
- Simple interaction event example

## Installation

First, clone this repository, then :

```
cd DiscordJS_TypeScript-Template
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to `example.config.json` (then remove the 'example'):

- `guildId`: The ID of the Guild (server) you want to setup the bot's functionality.
- `clientId`: The ID of your application.
- `token`: The secret token of your application (make sure to not push this to GitHub).

## Scripts

You now need to compile your TypeScript. There are many ways to do it. If you are confused, you might want to follow [TypeScript's official documentation](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Once you're done, you can use the following scripts from the `package.json`:

- `npm run deploycommands`: deploy the existing commands to your server.
- `npm run start`: starts the bot.

## Contributing

Contributions are always welcome! Feel free to add/correct anything that might have been forgotten!
