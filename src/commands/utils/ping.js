const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SendMessages'],
    ownerOnly: false,
    usage: 'ping',
    exemples: ['ping'],
    description: 'Commande ping!',
    async runInteration(client, interaction) {
        const tryPong = await interaction.reply({content: 'chargement...', fetchReply: true});

        const embed = new EmbedBuilder()
                        .setTitle('🏓Pong!')
                        .setColor('#3498DB')
                        .addFields([
                            {name: 'Latence', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
                            {name: 'Uptime', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true}
                        ])
                        .setFooter({
                            text: interaction.user.username,
                            iconURL: interaction.user.displayAvatarURL()
                        });

        interaction.editReply({content: ' ', embeds: [embed]});
    }
};
