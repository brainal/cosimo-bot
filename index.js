const Discord = require('discord.js')
const Client = new Discord.Client

const Cosimo = require('./cosimo.js')

Client.on('ready', () => {
	console.log("Cosimo è pronto! ")
})

Client.on('message', (msg) => {
	if (msg.content.toString().startsWith(Cosimo.prefix) && !msg.author.bot) {
		Cosimo.Interprete(msg, Client)
	}
	/*msg.channel.createInvite().then(invite => {
		msg.reply(invite.url)
	})*/
})

Client.on('messageDelete', (msg) => {
	msg.reply('Sbaglio o hai eliminato un messaggio che diceva: "' + msg.content + '"?');
})

Client.login(Cosimo.token)