
var GoogleTTS = require('./index.js');

GoogleTTS.convert('hello world', 'sample', function () {
  console.log('look at sample.mp3');
});

GoogleTTS.play('hello world this is a lot of text', function () {
  console.log('Done speaking!');
});
