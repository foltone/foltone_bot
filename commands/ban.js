const config = require('../config.json');

module.exports = {
    name: "ban",
    execute(client, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply("Tu n'a pas les permissions nécessaires pour effectuer cette commande!");
        }

        const member = message.mentions.members.first()
        if (!member) return message.reply("Merci de mentionner un utilisateur pour ban.")

        const reason = args.slice(1).join(' ');
        if (!reason) return message.reply('Merci de spécifier une raison pour ban');

        member.ban()

        message.reply(`<@${member.user.id}> a bien été banni.`);
        message.guild.channels.cache.find(ch => ch.id === config.ban.channellog).send(`${message.author} a banni <@${member.user.id}> pour ${reason}`);
    }
}