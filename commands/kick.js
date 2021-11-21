const config = require('../config.json');

module.exports = {
    name: "kick",
    execute(client, message, args) {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply("Tu n'a pas les permissions nécessaires pour effectuer cette commande!");
        }

        const member = message.mentions.members.first()
        if (!member) return message.reply('Vous devez mentionner un utilisateur à expulser.')

        const reason = args.slice(1).join(' ');
        if (!reason) return message.reply('Merci de spécifier une raison pour expulser un utilisateur');
        member.kick()
        message.reply(`<@${member.user.id}> a bien été expulsé.`);
        message.guild.channels.cache.find(ch => ch.id === config.kick.channellog).send(`${message.author} a expulsé <@${member.user.id}> pour ${reason}`);
    }
}