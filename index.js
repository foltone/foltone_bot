const {Client, Collection} = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({intents: 1539});
const Logger = require('./src/utils/Logger');

['commands'].forEach((x) => client[x] = new Collection());

['CommandUtil', 'EventUtil'].forEach((handler) => {
    require(`./src/utils/handlers/${handler}`)(client);
});

process.on('exit', (code) => {
    Logger.client(`le bot s'est arrété avec le code : ${code}!`);
});

process.on('uncaughtException', (err, origin) => {
    Logger.error(`uncaughtException : ${err}!`);
    console.error(`Origine : ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`unhandledRejection : ${reason}`);
    console.log(promise);
});

process.on('warning', (...args) => Logger.warn(...args));

client.login(process.env.DISCORD_TOKEN);
