const Discord = require('discord.js');
const Client = new Discord.Client();

const { token, prefix } = require('./auth.json');

const Insulti = [
	"ma tu promosso sei?",
	"non ci siamo.",
	"ma tu hai scelto informatica?",
	", ti devi impegnare di più.",
	"non ci siamo! Non studi mai, come vai nelle altre materie?",
	"questa è la terza volta che te lo spiego.",
	"come faccio a rimandarti?",
	"tu stai scherzando col fuoco.",
	"parlami degli automi",
	"che cosa sono le telecomunicazioni?",
	"ma mi stai persequitando?",
	"è un po' giusto e anche un po' sbagliato."
]

const InsultiVersoTutti = [
	"Andate tutti a posto!!!",
	"Ragazzi dovete ragionare con la vostra testa.",
	"Noh.",
	"Che cosa sono le telecomunicazioni?",
	"Parlatemi degli automi.",
	"La prossima volta faremo un piccolo test, non un compito.. un test.",
	"Ma mi state persequitando?"
]

const Domanda = [
	"Bella domanda.",
	"Davvero una bella domanda."
]

class Cosimo {

	static token = token;
	static prefix = prefix;

	static Insulta(nome) {
		let copyName = nome.charAt(0).toUpperCase() + nome.slice(1);
		let Insulto = copyName + " " + Insulti[Math.floor(Math.random() * Insulti.length)];
		return Insulto;
	}

	static InsultaVersoTutti() {
		let Insulto = "@everyone" + " " + InsultiVersoTutti[Math.floor(Math.random() * InsultiVersoTutti.length)];
		return Insulto;
	}

	static Info(msg) {
		const CosimoEmbed = new Discord.RichEmbed() 
			.setAuthor('#0099ff')
			.setTitle('Cosimo Title')
			.setDescription('Cosimo Description');
		msg.channel.send(CosimoEmbed);
	}

	static Interprete(msg) {

		if (msg.content.charAt(msg.content.length - 1) == '?') {
			if ((msg.content.includes("giovanni") || msg.content.includes("duro")) && msg.content.includes("gay")) {
				msg.reply('Di sicuro Duro è gay. ');
			}
			else { 
				msg.reply(Domanda[Math.floor(Math.random() * Domanda.length)]);
			}
		}

		const args = msg.content.slice(prefix.length).split(' ');

		if (args[1].toLowerCase() == "saluta") {
			msg.channel.send('Buongiorno, ' + args[2] + '.')
		}

		if (args[1].toLowerCase() == "insulta") {
			if (args[2].toLowerCase() == "tutti") {
				msg.channel.send(Cosimo.InsultaVersoTutti())
			} else if (args[2].toLowerCase() == "me") { 
				msg.channel.send(Cosimo.Insulta(msg.author.username));
			} else {
				msg.channel.send(Cosimo.Insulta(args[2]));
			}
		} else if (args[1].toLowerCase() == "insultami") 
			msg.channel.send(Cosimo.Insulta(msg.author.username));
		
		if (args[1].toLowerCase() == "pulisci") {
			msg.channel.bulkDelete(parseInt(args[2]) + 1);
		}

		if (args[1].toLowerCase() == "boccia") {
			let banUser = msg.mentions.users;
			banUser.forEach((user) => msg.guild.ban(user))
		}

		if (args[1].toLowerCase() == "rimanda") {
			let kickUser = msg.mentions.users;
			kickUser.forEach((user) => {
				msg.guild.member(user).kick();
			})
		}

		if (args[1].toLowerCase() == "cancella") {
			if (args[2].toLowerCase() == "questa") {
				msg.channel.delete();
			} else if (args[2].toLowerCase() == "tutto") {
				Client.channels.deleteAll();
			} else {
				let channelToDelete = msg.guild.channels.find(ch => ch.name == args[2]);
				if (!channelToDelete) {
					msg.reply('Cosimo non può eliminare un\'canale non esistente. ');
				} else {
					channelToDelete.delete();
				}
			}
		}
		
	}
}

module.exports = Cosimo