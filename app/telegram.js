
'use strict';

// Get the Bot Token
const token = process.env.BOT_TOKEN;

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const tg = new Telegram.Telegram(token);

class ChatController extends TelegramBaseController {

    handle(scope) {
        console.log(scope);
    }
}

tg.router
    .any(new ChatController());

module.exports = tg;
