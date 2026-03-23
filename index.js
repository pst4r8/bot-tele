import 'dotenv/config'
import { makeTelegramSocket } from "tg-socket"
import axios from 'axios';

const sock = makeTelegramSocket({
	token: process.env.BOT_TOKEN,
	polling: true
})

const getBuffer = async (url) => {
	const res = await axios.get(url, {
		responseType: "arraybuffer"
	})
	return Buffer.from(res.data)
}

sock.command("start", async msg => {
	await msg.reply("Hello from Telegram-Socket 👋")
})

sock.command(">", async (msg, q) => {
	try {
		let code = q[0]
		var evaled = await eval(code)
		if (typeof evaled !== 'string') evaled = inspect(evaled)
		await msg.reply(evaled)
	} catch (err) {
		return msg.reply(String(err))
	}
})

sock.command("igstalk", async (msg, q) => {
	console.log(JSON.stringify(msg,null,2))
	console.log(JSON.stringify(q,null,2))
	axios.get(`https://api.alyachan.dev/api/searching/ig/stalk?username=${q[0].replace(/^@/, '')}`, {
		headers: { 
			'Authorization': 'Bearer sk_prod_d71375171514d055a8d866302c92a4f5',
			'Content-Type': 'application/json'
	  }
	}).then(async ({ data }) => {
		if (data.status == false) return msg.reply("Username tidak ditemukan!")
		const item = data.data
		var caption = `*Username:* ${item.username}\n`
		caption += `*Nickname:* ${item.fullname}\n`
		caption += `*Following:* ${item.following}\n`
		caption += `*Followers:* ${item.followers}\n`
		caption += `*Private:* ${item.is_private}\n`
		caption += `*Posts:* ${item.post}\n`
		caption += `*Bio:* ${item.bio}\n`
		caption += `*Link:* https://instagram.com/${q[0].replace(/^@/, '')}`
		const buff = await getBuffer(item.profile)
		await msg.sendPhoto(msg.chat.id, buff, caption)
	}).catch(async (err) => {
		if (err?.response?.status === 404) {
			return msg.reply("Username tidak ditemukan!")
		} else {
			console.error(String(err))
			await msg.reply("Terjadi error pada fitur!")
		}
	})
})
	
	
	
sock.start()