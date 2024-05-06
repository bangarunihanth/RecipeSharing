// SpeechToText.js

import React, { useState } from 'react';

const SpeechToText = ({ setSearchQuery }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setSearchQuery(currentTranscript); // Update search query
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button className='primary-button' onClick={startListening} disabled={isListening}>
      {isListening ? 'Listening...' : 'Speak'}
    </button>
  );
};

export default SpeechToText;
