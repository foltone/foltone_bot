const config = require('../../../config.json');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(client, interaction) {
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.reply(`Cette commande n'existe pas!`);

    if (cmd.ownerOnly) {
      if (interaction.user.id != config.ownerId) return interaction.reply('Seule le fondateur peut effectuer cette commande!');
    }

    if (!interaction.member.permissions.has([cmd.permissions])) {
      return interaction.reply({ content: `Tu n'a pas les permissions requise, (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`, ephemeral: true,
      });
    }

    cmd.runInteration(client, interaction);
  },
};
