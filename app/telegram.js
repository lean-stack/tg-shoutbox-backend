
'use strict';

const Shout = require('../app/models/shout');

// Get the Bot Token
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

module.exports = (io) => {

    const tg = new Telegram.Telegram(token);

    class ChatController extends TelegramBaseController {

        handle($) {
            if( $.chatId != chatId ) {
                $.sendMessage('Sorry, private bot. No use for you.');
                return;
            }
            var shout = new Shout({ author: $.message.from.firstName, msg: $.message.text, date: new Date($.message.date * 1000)});
            shout.save((err,shout) => {
                if (err) {
                    $.sendMessage('bad shout');
                    return;
                }
                io.emit('rcv shout', shout);
                console.log(shout);
            });
        }
    }

    tg.router
        .any(new ChatController());

    return tg;
};
