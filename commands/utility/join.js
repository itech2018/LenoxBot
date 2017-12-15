exports.run = async(client, msg, args) => {
	const tableload = client.guildconfs.get(msg.guild.id);
	let addedrole = args.slice().join(' ');
    const foundRole = msg.guild.roles.find(role => role.name.toLowerCase() === args.slice().join(' ').toLowerCase());
	const author = msg.guild.members.get(msg.author.id);
	const channelID = msg.channel.id;

	if (addedrole.length < 1) return msg.reply('You must specify the name of the role!').then(m => m.delete(10000));
    if (!foundRole) return msg.reply('Höh ... This role does not exist at all!').then(m => m.delete(10000));
    if (msg.member.roles.has(foundRole.id)) return msg.reply('You already have this role!');

for (var i = 0; i < tableload.selfassignableroles.length; i++) {
	if (foundRole.id === tableload.selfassignableroles[i]) {
		try {
			await author.addRole(foundRole).then(m => m.guild.channels.get(channelID).send('Role successfully assigned!'))
		} catch (error) {
			await msg.channel.send('I don\'t have the necessary rights to give you this role. Please take a look at the rights of your roles and the order of your roles!')
		}
    }
}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
    userpermissions: []
};
exports.help = {
	name: 'join',
	description: 'Join a self-assignable role',
	usage: 'join {rolename}',
	example: ['join Member'],
	category: 'utility',
    botpermissions: ['SEND_MESSAGES', 'MANAGE_ROLES']
};