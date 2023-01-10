const {EmbedBuilder} = require('discord.js');
const cfx = require('cfx-api');
const config = require('../../../config.json');

module.exports = {
    name: 'serverinfo',
    category: 'cfx',
    permissions: ['SendMessages'],
    ownerOnly: false,
    usage: 'serverinfo',
    examples: ['serverinfo'],
    description: 'Commande serverinfo!',
    async runInteration(client, interaction) {
        const server = await cfx.fetchServer(config.fivemServer);

        interaction.reply({content: 'serverinfo', ephemeral: true});


        const oldEmbed = new EmbedBuilder()
                        .setTitle('Information serveur')
                        .setURL('https://servers.fivem.net/servers/detail/' + `${server.id}`)
                        .setDescription(`
          \n► **Nom :** ${server.hostname}
          \n► **Map :** ${server.data.mapname}
          \n► **Joueur en ligne :** ${server.data.clients}/${server.data.sv_maxclients}
          \n► **Status :** ${server.private ? 'Privé' : 'Publique'}
          \n► **Owner :** ${server.ownerName}
        `);
        const messageHandle = await interaction.channel.send({embeds: [oldEmbed]});

        setInterval(async () => {
            const server = await cfx.fetchServer(config.fivemServer);

            const newEmbed = new EmbedBuilder()
                            .setTitle('Information serveur')
                            .setURL('https://servers.fivem.net/servers/detail/' + `${server.id}`)
                            .setDescription(`
            \n► **Nom :** ${server.hostname}
            \n► **Map :** ${server.data.mapname}
            \n► **Joueur en ligne :** ${server.data.clients}/${server.data.sv_maxclients}
            \n► **Status :** ${server.private ? 'Privé' : 'Publique'}
            \n► **Owner :** ${server.ownerName}
          `);
            messageHandle.edit({embeds: [newEmbed]});
        }, 15000);
    }
};
