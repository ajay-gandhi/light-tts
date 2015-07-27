# google-tts

A Node.js module for text-to-speech conversion using Google's TTS API.

## Installation

    $ npm install google-tts

## Usage

You can either play the received speech directly or save it to a file:

```js
var GoogleTTS = require('google-tts');

// Play the received speech
GoogleTTS.play(text[, callback]);

// Save the received speech into an mp3 file
GoogleTTS.convert(text, filename[, callback]);
```

The callback functions are run after the speech is finished playing or the file
is completely written, respectively.

Note that the `.mp3` extension is added automatically to `filename` for safety.

