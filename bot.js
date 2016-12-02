var Botkit = require('botkit');
var controller = Botkit.slackbot();
var webserver = require('./webserver')
var LocationMapper = require('./LocationMapper')

webserver.start();

controller.spawn({
    token: process.env.TEST_PLAY_BOT_TOKEN
}).startRTM(function (err, bot, payload) {
    if (!err) return;

    console.log(err);
    throw new Error('Unable to connect to Slack');
});

controller.hears(
    ['hey'],
    ['ambient'],
    function (bot, message) {
        bot.api.users.info(
            {user: message.user},
            function (error, response) {
                console.log(response.user);
                bot.reply(message, '@' + response.user.name + ' hey!');
            }
        );
    }
);

controller.hears(['whereami'], ['direct_message', 'direct_mention'], function (bot, message) {
    console.log(message);
    bot.reply(message, 'http://localhost:8080/index.html!');
    LocationMapper.request('id', function (position){
        console.log('position from location mapper', position);
        bot.reply(message, 'your coordinates are ' + position['coords[latitude]'] + ', ' + position['coords[longitude]']);
    });
});
