import 'dotenv/config'
import { makeTelegramSocket } from "tg-socket"

const sock = makeTelegramSocket({
  token: process.env.BOT_TOKEN,
  polling: true
})

sock.command("start", async msg => {
	console.log(JSON.stringify(msg,null,2))
  await msg.reply("Hello from Telegram-Socket 👋")
})

sock.start()