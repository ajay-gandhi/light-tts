
var LightTTS = require('./index.js');

// Save speech to a file
LightTTS.save('i am saved in a file', 'sample', function () {
  console.log('look at sample.mp3');
});

// Switch to tts-api (default is Google)
LightTTS.select_api('tts_api');

// Play on speakers
LightTTS.say('listen to me speak', function () {
  console.log('Done speaking!');
});
