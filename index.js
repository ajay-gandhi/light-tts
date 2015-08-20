
var request = require('request'),
    fs      = require('fs'),
    Lame    = require('lame'),
    Speaker = require('speaker'),
    qs      = require('querystring');

module.exports = (function () {

  function LightTTS() {
    this.apis = {
      google:  'http://translate.google.com/translate_tts?',
      tts_api: 'http://tts-api.com/tts.mp3?'
    }

    // Default api is Google
    this.api_url = apis.google;

    // Default langauage is english
    this.args = {
      text: '',
      tl: 'en'
    }
  }

  /**
   * Set TTS options
   */
  module.exports.set_opts = function (opts) {
    if (opts.api_name && this.apis[opts.api_name])
      this.api_url = this.pis[opts.api_name];

    // Only Google supports languages
    if (opts.lang) {
      if (this.api_url === this.apis.google) this.args.tl = opts.lang;
      else console.log('Only Google TTS supports additional languages');
    }
  }

  /**
   * Converts provided text to speech and saves as the given file
   */
  LightTTS.prototype.save = function (text, filename, callback) {
    // Ensure args
    if (!text)     return console.log('Missing "text" parameter');
    if (!filename) return console.log('Missing "filename" parameter');

    this.args.text = text;

    // Form the URL
    var options = {
      url: api_url + qs.stringify(this.args)
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
  LightTTS.prototype.say = function (text, callback) {
    // Ensure args
    if (!text) return console.log('Missing "text" parameter');

    this.args.text = text;

    // Form the URL
    var options = {
      url: api_url + qs.stringify(this.args)
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

  return new LightTTS();

})();
