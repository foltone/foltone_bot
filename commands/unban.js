const config = require('../config.json');

module.exports = {
    name: "unban",
    execute(client, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply("Tu n'a pas les permissions nécessaires pour effectuer cette commande!");
        }

        const userID = args[0]
        if (!userID) return message.reply("Merci de mentionner un utilisateur pour débannir.")

        message.guild.bans.fetch().then(bans => {
            if (bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if (bannedUser) {

                message.reply(`<@${userID}> a bien été débanni.`).then(message.guild.members.unban(bannedUser.user));
                message.guild.channels.cache.find(ch => ch.id === config.unban.channellog).send(`${message.author} a débanni <@${userID}>`);

            } else {
                message.reply("ID d'utilisateur invalide.")
            }
        })

    }
}
