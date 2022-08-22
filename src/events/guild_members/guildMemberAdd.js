const { AttachmentBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const config = require('../../../config.json');

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(client, member) {

    if (!member.guild) return;


    const canvas = createCanvas(1772, 633);
    const context = canvas.getContext('2d');

    const background = await readFile('src/img/welcome.png');
    const backgroundImage = new Image();
    backgroundImage.src = background;
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#f2f2f2';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const textString3 = `${member.user.username}`;

    if (textString3.length >= 14) {
      context.font = 'bold 100px "Arial"';
      context.fillStyle = '#f2f2f2';
      context.fillText(textString3, 720, canvas.height / 2 + 20);
    } else {
      context.font = 'bold 150px "Arial"';
      context.fillStyle = '#f2f2f2';
      context.fillText(textString3, 720, canvas.height / 2 + 20);
    }

    context.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    context.clip();

    const { body } = await request(member.user.displayAvatarURL({ format: 'jpg' }));
    const avatar = new Image();
    avatar.src = Buffer.from(await body.arrayBuffer());
    context.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'profile-image.png' });

    const logChannel = client.channels.cache.get(config.channelIdJoinMessage);
    logChannel.send({ content: `Bienvenu sur ${member.guild.name}, ${member.user}!`, files: [attachment] });
  },
};
