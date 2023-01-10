const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'moderation',
    permissions: ['BanMembers'],
    ownerOnly: false,
    usage: 'unban [@cible] [raison]',
    exemples: ['unban @user raison'],
    description: 'unban un utilisateur avec une raison!',
    options: [
        {
            name: 'cible',
            description: 'L\'utilisateur à unban',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async runInteration(client, interaction) {
        const cible = interaction.options.getUser('cible');

        interaction.guild.bans.fetch().then((bans)=> {
            if (bans.size == 0) return;
            const bUser = bans.find((b) => b.user.id == cible.id);
            if (bUser) {
                interaction.guild.members.unban(bUser.user);
                interaction.reply(`L'utilisateur ${cible} a bien été unban.`);
            } else {
                interaction.reply(`L'utilisateur invalide.`);
            }
        });
    }
};
