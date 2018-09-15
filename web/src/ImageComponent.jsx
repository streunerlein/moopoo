import React from 'react';
import TextField from '@material-ui/core/TextField';

class ImageComponent extends React.Component {
  endPoint = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDIppPwnZEFDXXNXxyzCuDYgXRyiMwUwiA';

  state = {
    url: '',
    b64: ''
  };

  constructor(props) {
    super(props);
    this.sourceCanvas = React.createRef();
    this.targetCanvas = React.createRef();
  }
  
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.sourceCanvas.current.addEventListener('load', (e) => this.imageLoaded());
  }

  handleChange(e) {
    let url = e.target.value;
    fetch('https://moopoo.serious-coding.biz/getpic.php?path=' + encodeURIComponent(url))
    .then(response => response.text())
    .then(imgB64 => this.imageReady(url, imgB64));
  }

  imageReady(url, imgB64) {
    this.sourceCanvas.current.setAttribute('src', url);

    this.setState({
      url: url,
      b64: imgB64
    });
  }

  imageLoaded() {
    const data = {
      "requests": [
        {
          "image": {
            "content": this.state.b64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            },
            {
              "type": "IMAGE_PROPERTIES"
            }
          ]
        }
      ]
    };
    fetch(this.endPoint, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(result => {
      const source = this.sourceCanvas.current;
      const target = this.targetCanvas.current;

      target.width = source.width;
      target.height = source.height;

      const targetCtx = target.getContext('2d');
      targetCtx.drawImage(source, 0, 0, source.width, source.height);

      if (result.responses && result.responses.length) {
        let response = result.responses[0];

        let text = window.poopify(this.props.words, response.textAnnotations.slice(1).map(d => d.description));
        let colorsSorted = response.imagePropertiesAnnotation.dominantColors.colors.slice(0).sort((a, b) => a.score - b.score);
        let bgColor = colorsSorted[colorsSorted.length - 1].color;
        let textColor = colorsSorted[0].color;

        targetCtx.textBaseline="top"; 

        response.textAnnotations.slice(1).forEach((response, ix) => {
          const vertices = response.boundingPoly.vertices;
          targetCtx.beginPath();
          targetCtx.moveTo(vertices[0].x, vertices[0].y);
          targetCtx.lineTo(vertices[1].x, vertices[1].y);
          targetCtx.lineTo(vertices[2].x, vertices[2].y);
          targetCtx.lineTo(vertices[3].x, vertices[3].y);
          targetCtx.fillStyle = `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`;
          targetCtx.fill();

          targetCtx.font = (vertices[3].y - vertices[0].y) + "px Arial";
          targetCtx.fillStyle = `rgb(${textColor.red}, ${textColor.green}, ${textColor.blue})`;
          targetCtx.fillText(text[ix], vertices[0].x, vertices[0].y);
        });
      }
    });
  }

  render() {
    return (
      <div style={{maxWidth: '1000px', margin: '2em auto'}}>
        <TextField
          label="Image URL"
          onKeyUp={(e) => this.handleChange(e)}
          margin="normal"
        />
        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <img style={{margin:'1em'}} ref={this.sourceCanvas} id="sourceCanvas" />
          <canvas style={{margin:'1em'}} ref={this.targetCanvas} id="targetCanvas"></canvas>
        </div>
      </div>
    );
  }
}

export default ImageComponent;