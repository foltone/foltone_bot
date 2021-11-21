const config = require('./config.json');
const Discord = require("discord.js");
const fivereborn = require('fivereborn-query');
const client = new Discord.Client(
    {
        allowedMentions: {
            parse: ['roles', 'users', 'everyone'],
            repliedUser: config.bot_peut_mention // false = bot @ pas les personne en reply | true = bot @ les personne en reply
        },
        partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
        presence: {
            status: 'online'
        },
        intents: 32767 // 32767 = tout les intents
    }
);

client.on("ready", () => {
    console.log("Bot online! \nCréé par Foltone#6290!");
});

function activity() {
    setTimeout(() => {
        fivereborn.query(config.server_info.ip, config.server_info.port, (err, data) => {
            if (err) {
                return console.log(err);
            } else {
                client.user.setActivity(`${data.clients}/${config.server_info.slot} joueurs sur ${config.server_info.nom}`, { type: `${config.server_info.type}` });
            }
        });
        activity();
    }, 6000);
}
activity();

client.on("messageCreate", message => {
    if (message.author.bot) return;

    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);

    if (message.content.startsWith(config.prefix)) {
        try {
            let commandFile = require(`./commands/${command.slice(config.prefix.length)}.js`)
            commandFile.execute(client, message, args);
        } catch (e) {
            console.warn(`Erreur handler : ${e}`);
            return;
        }
    }
})

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get(config.welcome.welcome_channel);
    if (!channel) return;
    var msg = config.welcome.welcome_message.replace("[user_name]", `<@${member.id}>`)
    msg = msg.replace("[server_name]", `${member.guild.name}`)
    channel.send(msg)
});
client.login(config.token);