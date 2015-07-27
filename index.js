
var request = require('request'),
    fs = require('fs');

var api_url = 'http://translate.google.com/translate_tts?tl=en&q=';

module.exports.convert = function (text, filename, callback) {
  var options = {
    url: api_url + text
  }

  var mp3File  = filename + '.mp3';
  var mp3_file = fs.createWriteStream(mp3File);

  request.get(options)
    .on('data', function (data){
      mp3_file.write(data);
    })
    .on('end', function(){
      mp3_file.end();

      if (callback) callback();
    });
}
