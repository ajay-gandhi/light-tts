# google-tts

A Node.js module for text-to-speech conversion using Google's TTS API.

## Installation

    $ npm install google-tts

## Usage

The only existing implementation is to save the audio as an mp3 file.

```js
var GoogleTTS = require('google-tts');

GoogleTTS.convert(text, filename[, callback]);
```

Note that the `.mp3` extension is added automatically for safety.

