const {EmbedBuilder} = require('discord.js');
const cfx = require('cfx-api');
const config = require('../../../config.json');

module.exports = {
    name: 'listplayer',
    category: 'cfx',
    permissions: ['SendMessages'],
    ownerOnly: false,
    usage: 'listplayer',
    examples: ['listplayer'],
    description: 'Afficher la liste des joueur.',
    async runInteration(client, interaction) {
        const server = await cfx.fetchServer(config.fivemServer);
        const listPlayer = server.players.map((p) => '[' + p.id + '] ' + p.name).join(' \n ');

        if (listPlayer.length > 4096) {
            interaction.reply({content: 'trop de joueur', ephemeral: true});
        } else if (!listPlayer.length || listPlayer.length <= 0) {
            const newEmbed = new EmbedBuilder()
                            .setTitle('Liste des joueurs :')
                            .setDescription(`aucun joueur`);
            interaction.reply({embeds: [newEmbed]});
        } else {
            interaction.reply({content: 'listplayer', ephemeral: true});
            const oldEmbed = new EmbedBuilder()
                            .setTitle('Liste des joueurs :')
                            .setDescription(`${listPlayer}`);

            const messageHandle = await interaction.channel.send({embeds: [oldEmbed]});

            setInterval(async () => {
                const server = await cfx.fetchServer(config.fivemServer);
                const listPlayer = server.players.map((p) => '[' + p.id + '] ' + p.name).join(' \n ');
                if (listPlayer.length > 4096) {
                    const newEmbed = new EmbedBuilder()
                                    .setTitle('Liste des joueurs :')
                                    .setDescription(`trop de joueurs`);
                    messageHandle.edit({embeds: [newEmbed]});
                } else if (!listPlayer.length || listPlayer.length <= 1) {
                    const newEmbed = new EmbedBuilder()
                                    .setTitle('Liste des joueurs :')
                                    .setDescription(`aucun joueur`);
                    messageHandle.edit({embeds: [newEmbed]});
                } else {
                    const newEmbed = new EmbedBuilder()
                                    .setTitle('Liste des joueurs :')
                                    .setDescription(`${listPlayer}`);
                    messageHandle.edit({embeds: [newEmbed]});
                }
            }, 15000);
        }
    }
};
