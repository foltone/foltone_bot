const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('src/commands');

module.exports = {
  name: 'help',
  category: 'utils',
  permissions: ['SendMessages'],
  ownerOnly: false,
  usage: 'ping',
  exemples: ['ping'],
  description: 'Commande help!',
  options: [
    {
      name: 'commande',
      description: 'Taper le nom de votre commande',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  async runInteration(client, interaction) {
    const cmdName = interaction.options.getString('commande');

    if (!cmdName) {
      const noArgsEmbed = new EmbedBuilder()
          .addFields([
            {name: 'List des commandes', value: `Une liste de toutes les catégories et de leurs commandes. \nPour plus d'informations sur une commande, tapez \`/help <commande>\``},
          ]);

      for (const category of commandFolder) {
        noArgsEmbed.addFields([
          {name: `${category.replace(/(^\W|\S\W)/g, (firstLetter) => firstLetter.toUpperCase())}`,
            value: `\`${client.commands.filter((cmd) => cmd.category == category.toLocaleLowerCase()).map((cmd) => cmd.name).join(', ')}\``},
        ]);
      }

      return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
    }

    const cmd = client.commands.get(cmdName);
    if (!cmd) return interaction.reply({ content: 'Cette commande n\'existe pas!', ephemeral: true });

    const embed = new EmbedBuilder()
        .setTitle(`Commande : ${cmd.name}`)
        .setDescription(`${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}`)
        .addFields([
          { name: '► Permissions:', value: `${cmd.permissions.join(', ')}`, inline: true },
          { name: '► Utilisation:', value: `/${cmd.usage}`, inline: true },
          { name: '► Exemples:', value: `/${cmd.exemples.join(` | /`)}`, inline: false },
        ])
        .addFields([
          {
            name: '\nInfo:',
            value: `{} = sous-commande disponible | [] = option obligatoire | <> = option facultative \nNe pas inclure ces caractères -> {}, [] et <> dans vos commandes.`,
            inline: false,
          },
        ]);
    return interaction.reply({ embeds: [embed], ephemeral: true });

  },
};
