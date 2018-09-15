import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = {
  largeIcon: {
    fontSize: 64
  },
};

class LiveComponent extends React.Component {
  state = {
    audioContent: null,
    isRecording: false,
  };
  
  onRecordClick() {
    return async () => {
      this.setState({ isRecording: true });
      const originalText = await record();
      this.setState({ isRecording: false });
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
        <IconButton 
          onClick={this.onRecordClick()} 
          aria-label="Mic"
        >
          <Icon style={{ 
            fontSize: 64, 
            color: this.state.isRecording ? undefined : '#f50057' 
          }}>mic</Icon>
        </IconButton>
        <IconButton 
          onClick={this.onPlayClick()} 
          aria-label="PlayCircleOutline"
          disabled={!this.state.audioContent}
        >
          <Icon style={{ fontSize: 64 }}>play_circle_outline</Icon>
        </IconButton>
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
