/**
 * TODO:
 * - Add throttling (cooldown)
 */

const Discord = require('discord.js');
const LenoxCommand = require('../LenoxCommand.js');

module.exports = class embedCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'embed',
			group: 'utility',
			memberName: 'embed',
			description: 'Creates an embed for you with any text. Use // to go to a new line',
			guarded: true,
			guildOnly: true,
			examples: ['embed Welcome on this discord server! Here is a list of all rules on this discord server...'],
			clientPermissions: ['SEND_MESSAGES']
		});
	}

	run(msg) {
		const langSet = msg.client.provider.get(msg.message.guild.id, 'language', 'en-US');
		const lang = require(`../../languages/${langSet}.json`);

        const args = msg.content.split(' ').slice(1);
		const input = args.slice();
		if (!input || input.length === 0) return msg.reply(lang.embed_error);
		if (input.join(' ').length > 1000) return msg.reply(lang.embed_toobig);

		const embedinput = input.join(' ').replace('//', '\n');
		const embed = new Discord.RichEmbed()
			.setDescription(embedinput)
			.setColor('#66ff66');

		msg.channel.send({
			embed
		});
	}
};
