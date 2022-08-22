const { ActivityType } = require('discord.js');
const Logger = require('../../utils/Logger');
const cfx = require('cfx-api');
const config = require('../../../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    Logger.client('Bot ON');

    setTimeout(async () => {
      const server = await cfx.fetchServer(config.fivemServer);

      client.user.setPresence({
        activities: [
          {
            name: `Joueur en ligne : ${server.data.clients}/${server.data.sv_maxclients}`,
            type: ActivityType.Watching,
          },
        ],
        status: 'online',
      });

    }, 6000);

    const devGuild = await client.guilds.cache.get(config.guildId);
    devGuild.commands.set(client.commands.map((cmd) => cmd));
  },
};
