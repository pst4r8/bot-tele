const { makeTelegramSocket } = require("tg-socket")

const bot = makeTelegramSocket({
  token: "5789636012:AAEFEqHuqONCH7B_jckNWVMHBx5sLqMB5mU",
  polling: true
})

bot.command("start", async msg => {
  await msg.reply("Hello from Telegram-Socket 👋")
})

bot.start()