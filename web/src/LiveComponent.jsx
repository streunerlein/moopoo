import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

class LiveComponent extends React.Component {
  state = {
    audioContent: null,
    isRecording: false,
  };

  componentDidMount() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";
      this.recognition.onerror = (e) => {
        this.setState({ isRecording: false, audioContent: null });
      }
      this.recognition.onresult = (e) => {
        const { transcript } = e.results[0][0];
        console.log(transcript);
        this.textToSpeech(transcript).then(audioContent => {
          this.setState({ audioContent });
        })
      };
    }
  }
  
  onRecordDown() {
    return async () => {
      if (this.recognition) {
        this.setState({ isRecording: true });
        this.recognition.start();
      }
    };
  }

  onRecordUp() {
    return async () => {
      if (this.recognition) {
        this.setState({ isRecording: false });
        this.recognition.stop();
      }
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

  async textToSpeech(originalText) {
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
    return audioContent;
  }

  render() {
    return (
      <div style={{marginTop:'3em'}}>
        <IconButton 
          style={{margin:'1em'}}
          onMouseDown={this.onRecordDown()}
          onMouseUp={this.onRecordUp()}
          aria-label="Mic"
        >
          <Icon style={{ 
            fontSize: 64, 
            color: this.state.isRecording ? undefined : 'rgb(212, 59, 59)' 
          }}>mic</Icon>
        </IconButton>
        <IconButton 
          style={{margin:'1em'}}
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

export default LiveComponent;
