# light-tts

A lightweight text-to-speech module for Node.js

## Installation

    $ npm install light-tts

## Usage

You can either save the 

```js
var LightTTS = require('light-tts');

// Play the received speech
LightTTS.say(text[, callback]);

// Save the received speech into an mp3 file
LightTTS.save(text, filename[, callback]); // .mp3 extension added automatically
```

You can choose between two TTS APIs: `google` and `tts_api`, with Google being
the default. To select one or another:

```js
LightTTS.select_api('tts_api'); // Use 'google' to switch to Google TTS
```

The callback functions are run after the speech is finished playing or the file
is completely written.

__Coming soon:__ More error handling, catching missing arguments cleanly

