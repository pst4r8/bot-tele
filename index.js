const { makeTelegramSocket } = require("@xrelly-spec/telegram-socket")

const bot = makeTelegramSocket({
  token: process.env.BOT_TOKEN,
  polling: true
})

bot.command("start", async msg => {
  await msg.reply("Hello from Telegram-Socket 👋")
})

bot.start()