const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');
const { ApplicationCommandType } = require('discord.js');

module.exports = async (client) => {
  (await pGlob(`${process.cwd()}/src/commands/*/*.js`)).map(async (cmdFile) => {
    const cmd = require(cmdFile);

    if (!cmd.name) return Logger.warn(`Command non chargée, pas de nom ↓\nFichier --> ${cmdFile}`);

    if (!cmd.description && cmd.type != ApplicationCommandType.User) return Logger.warn(`Command non chargée, pas de description ↓\nFichier --> ${cmdFile}`);

    if (!cmd.category) return Logger.warn(`Command non chargée, pas de catégorie ↓\nFichier --> ${cmdFile}`);

    if (!cmd.permissions) return Logger.warn(`Command non chargée, pas de permissions ↓\nFichier --> ${cmdFile}`);

    if (cmd.ownerOnly == undefined) return Logger.warn(`Command non chargée, pas de ownerOnly ↓\nFichier --> ${cmdFile}`);

    if (!cmd.usage) return Logger.warn(`Command non chargée, pas d'usage ↓\nFichier --> ${cmdFile}`);

    if (!cmd.exemples) return Logger.warn(`Command non chargée, pas d'exemples ↓\nFichier --> ${cmdFile}`);

    cmd.permissions.forEach((permission) => {
      if (!permissionList.includes(permission)) {
        return Logger.syntax(`Command non chargée, erreur de syntax sur la permission : ${permission} ↓\nFichier --> ${cmdFile}`);
      }
    });

    client.commands.set(cmd.name, cmd);
    Logger.command(`- ${cmd.name}`);
  });
};

const permissionList = [
  'CreateInstantInvite',
  'KickMembers',
  'BanMembers',
  'Administrator',
  'ManageChannels',
  'ManageGuild',
  'AddReactions',
  'ViewAuditLog',
  'PrioritySpeaker',
  'Stream',
  'ViewChannel',
  'SendMessages',
  'SendTTSMessages',
  'ManageMessages',
  'EmbedLinks',
  'AttachFiles',
  'ReadMessageHistory',
  'MentionEveryone',
  'UseExternalEmojis',
  'ViewGuildInsights',
  'Connect',
  'Speak',
  'MuteMembers',
  'DeafenMembers',
  'MoveMembers',
  'UseVAD',
  'ChangeNickname',
  'ManageNicknames',
  'ManageRoles',
  'ManageWebhooks',
  'ManageEmojisAndStickers',
  'UseApplicationCommands',
  'RequestToSpeak',
  'ManageEvents',
  'ManageThreads',
  'CreatePublicThreads',
  'CreatePrivateThreads',
  'UseExternalStickers',
  'SendMessagesInThreads',
  'UseEmbeddedActivities',
  'ModerateMembers',
];
