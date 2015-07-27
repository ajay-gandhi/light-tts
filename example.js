
var google_tts = require('./index.js');

google_tts.convert('hello world', 'sample.mp3', function () {
  console.log('look at sample.mp3');
});

