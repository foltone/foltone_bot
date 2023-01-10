const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BanMembers'],
    ownerOnly: false,
    usage: 'ban [@cible] [raison]',
    examples: ['ban @user raison'],
    description: 'Ban un utilisateur avec une raison!',
    options: [
        {
            name: 'cible',
            description: 'L\'utilisateur à ban',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'raison',
            description: 'La raison du ban',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'clear',
            description: 'La clear les message de la personne',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    async runInteration(client, interaction) {
        const cible = interaction.options.getMember('cible');
        const raison = interaction.options.getString('raison');
        const clear = interaction.options.getBoolean('clear');

        if (!cible.bannable) return interaction.reply('Cette utilisateur ne peut pas etre ban!');
        if (clear) {
            cible.ban({days: 7, reason: raison});
            interaction.reply(`L'utilisateur ${cible} a bien été ban avec clear des messages, pour : ${raison}`);
        } else {
            cible.ban({reason: raison});
            interaction.reply(`L'utilisateur ${cible} a bien été ban sans clear des messages, pour : ${raison}`);
        }
    }
};
