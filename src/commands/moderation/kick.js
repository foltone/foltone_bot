const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'kick',
  category: 'moderation',
  permissions: ['KickMembers'],
  ownerOnly: false,
  usage: 'kick [@cible] [raison]',
  exemples: ['kick @user raison'],
  description: 'Kick un utilisateur avec une raison!',
  options: [
    {
      name: 'cible',
      description: 'L\'utilisateur à kick',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'raison',
      description: 'La raison du kick',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async runInteration(client, interaction) {
    const cible = interaction.options.getMember('cible');
    const raison = interaction.options.getString('raison');

    if (!cible.kickable) return interaction.reply('Cette utilisateur ne peut pas etre kick!');
    cible.kick(raison);
    interaction.reply(`L'utilisateur ${cible} a bien été kick pour : ${raison}`);
  },
};
