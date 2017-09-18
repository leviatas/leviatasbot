var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(request, response) {
  
});

app.listen(process.env.PORT || 3000)

var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("286347105:AAEST1sg39bF1pVMcrF_klijfMuTlkORP-U", { polling: true });

var Clear = require('codeday-clear'),
    // Our sample app token and secret
    clear = new Clear("1YZiGaj3baaLU8IKVsASRIWaNF2oJNg0", "1COMnWyGnGBsNqkhaZ6WMBWB9UWZw6QZ");

// moment is not a class, just a simple function
var moment = require('moment');

telegram.on("text", (message) => {
  if(message.text.toLowerCase().indexOf("/codeday") === 0){
    clear.getEventById("oo4QIuKQQTYA", (codedayEvent) => {
      var endsAt = moment(codedayEvent.ends_at * 1000);
      telegram.sendMessage(message.chat.id, "CodeDay ends *" + endsAt.fromNow() + "*!", {
           parse_mode: "Markdown"
      });
    });
  }else{
telegram.sendMessage(message.chat.id, "Hello world");

	}
});

telegram.on("inline_query", (query) => {
  var searchTerm = query.query.trim();

  clear.getRegions((regions) => {
    var queryResults = [ ];

    regions.forEach((region) => {
      if(region.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 && region.current_event && region.current_event.venue){
        queryResults.push({
          type: "article",
          id: region.id,
          title: "CodeDay " + region.name,
          description: "Hosted at " + region.current_event.venue.full_address,
          input_message_content: {
            latitude: region.location.lat,
            longitude: region.location.lng,
            title: "CodeDay " + region.name,
            address: region.current_event.venue.full_address
          }
        });
      }
    });

    telegram.answerInlineQuery(query.id, queryResults);
  });
});