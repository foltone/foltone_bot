const config = require('../config.json');

module.exports = {
    name: "clear",
    execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Tu n'a pas les permissions nécessaires pour effectuer cette commande!");
        }

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send('Veuillez entrer un numéro.')
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('Vous ne pouvez que supprimer des messages de 1 à 99.')
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send("Une erreur s'est produite lors de la suppression.")
        })
        message.channel.send(`Suppression de ${amount - 1} messages effectuer.`);
        message.guild.channels.cache.find(ch => ch.id === config.clear.channellog).send(`${message.author} à supprimé ${amount - 1} dans #${message.channel.name}`);
    }
}
