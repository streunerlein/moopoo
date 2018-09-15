import React from 'react';

class LiveComponent extends React.Component {
  state = {
    audioContent: null
  };
  
  onRecordClick() {
    return async () => {
      const originalText = await record();
      const [ poopifiedText ] = window.poopify(this.props.words, [ originalText ]);
      const response = await fetch(
        'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDx-aPyKp11pbF4tYzAHj4SYhlVjghMqKU', 
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            audioConfig: {
              audioEncoding: "LINEAR16",
              pitch: "0.00",
              speakingRate: "1.00"
            },
            input: { text: poopifiedText },
            voice: {
              languageCode: "en-US",
              name: "en-US-Wavenet-D"
            }
          }),
        },
      );  
      const { audioContent } = await response.json();
      this.setState({ audioContent })
    };
  }

  onPlayClick() {
    return () => {
      const { audioContent } = this.state;
      this.setState({ audioContent: null });
      setTimeout(() => {
        this.setState({ audioContent });
      }, 100);
    };
  }
  render() {
    return (
      <div>
        <h3>Live</h3>
        <button onClick={this.onRecordClick()}>REC</button>
        <button 
          onClick={this.onPlayClick()} 
          disabled={!this.state.audioContent}
        >PL</button>
        {this.state.audioContent && (<audio src={`data:audio/mp3;base64,${this.state.audioContent}`} autoPlay/>)}
      </div>
    );
  }
}

async function record() {
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();
    return new Promise((resolve, reject) => {
      recognition.onresult = (e) => {
        recognition.stop();
        resolve(e.results[0][0].transcript);
      };
      recognition.onerror = e => {
        recognition.stop();
        reject();
      }
    });
  }
}

export default LiveComponent;
