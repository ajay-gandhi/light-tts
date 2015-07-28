
var request = require('request'),
    fs      = require('fs'),
    Lame    = require('lame'),
    Speaker = require('speaker');

var api_url = 'http://translate.google.com/translate_tts?tl=en&q=';

module.exports.convert = function (text, filename, callback) {
  // Form the URL
  var options = {
    url: api_url + escape(text)
  }

  // File to save audio to
  var mp3File  = filename + '.mp3';
  var mp3_file = fs.createWriteStream(mp3File);

  // Make API request
  request
    .get(options)
    .on('error', function (err) {
      console.log(err)
    })
    .on('data', function (data) {
      mp3_file.write(data);
    })
    .on('end', function(){
      mp3_file.end();

      if (callback) callback();
    });
}

module.exports.play = function (text, callback) {
  // Form the URL
  var options = {
    url: api_url + escape(text)
  }

  // Pipe to Lame to convert to PCM, then pipe to speakers
  request
    .get(options)
    .on('error', function (err) {
      console.log(err)
    })
    .pipe(new Lame.Decoder())
    .on('format', function (format) {
      var playing = this.pipe(new Speaker(format));

      playing.on('error', function (err) {
        console.log(err);
      });

      playing.on('finish', function () { 
        if (callback) callback();
      });
    });
}
