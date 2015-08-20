# light-tts

A lightweight text-to-speech module for Node.js

## Installation

    $ npm install light-tts

## Usage

You can either save the audio as an mp3 file or speak it directly: 

```js
var LightTTS = require('light-tts');

// Play the received speech
LightTTS.say(text[, callback]);

// Save the received speech into an mp3 file
LightTTS.save(text, filename[, callback]); // .mp3 extension added automatically
```

The callback functions are run after the speech is finished playing or the file
is completely written.

## Options

Here is a short list of the possible options:

* `api_name` - Choose which API to use: `google` or `tts_api`. `google` is the
               default
* `lang` - Choose which language to use. Only the `google` APi supports this
           option

To set new options:

```js
// Switch to Spanish
LightTTS.set_opts({
  api_name: 'google',
  lang: 'es'
});
```
