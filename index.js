
var request = require('request'),
    fs      = require('fs'),
    Lame    = require('lame'),
    Speaker = require('speaker');

// Default api is Google
var apis = {
  google:  'http://translate.google.com/translate_tts?tl=en&q=',
  tts_api: 'http://tts-api.com/tts.mp3?q='
}

var api_url = apis.google;

/**
 * Selects a TTS API
 */
module.exports.select_api = function (api_name) {
  // Ensure arg
  if (!api_name) return console.log('Missing "api_name" parameter');

  if (apis[api_name]) api_url = apis[api_name];
}

/**
 * Converts provided text to speech and saves as the given file
 */
module.exports.save = function (text, filename, callback) {
  // Ensure args
  if (!text)     return console.log('Missing "text" parameter');
  if (!filename) return console.log('Missing "filename" parameter');

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
      console.log(err);
    })
    .on('data', function (data) {
      mp3_file.write(data);
    })
    .on('end', function(){
      mp3_file.end();

      if (callback) callback();
    });
}

/**
 * Converts the given text to speech and plays it
 */
module.exports.say = function (text, callback) {
  // Ensure args
  if (!text) return console.log('Missing "text" parameter');

  // Form the URL
  var options = {
    url: api_url + escape(text)
  }

  // Pipe to Lame to convert to PCM, then pipe to speakers
  request
    .get(options)
    .on('error', function (err) {
      console.log(err);
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
