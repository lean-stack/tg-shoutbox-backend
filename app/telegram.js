
'use strict';

// Get the Bot Token
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const tg = new Telegram.Telegram(token);

let io = undefined;

class ChatController extends TelegramBaseController {

    handle(scope) {
        if( scope.chatId != chatId ) {
            scope.sendMessage('Sorry, private bot. No use for you.');
        }
        console.log(scope.chatId);
    }
}

tg.router
    .any(new ChatController());

module.exports = { tg: tg, io: io };
