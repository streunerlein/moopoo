import React from 'react';
import TextField from '@material-ui/core/TextField';

class ImageComponent extends React.Component {
  endPoint = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDIppPwnZEFDXXNXxyzCuDYgXRyiMwUwiA';

  state = {
    url: ''
  };

  constructor(props) {
    super(props);
    this.sourceCanvas = React.createRef();
    this.targetCanvas = React.createRef();
  }
  
  shouldComponentUpdate() {
    return false;
  }

  handleChange(e) {
    let img = new Image();
    img.src = '/getpic.php?path=' + encodeURIComponent(e.target.value);
    img.addEventListener('load', () => this.imageReady(img));
  }

  imageReady(img) {
    let target = this.sourceCanvas.current;
    target.width = img.width;
    target.height = img.height;
    debugger;
    const targetCtx = target.getContext("2d");
    targetCtx.drawImage(img, 0, 0, img.width, img.height);

    const data = {
      "requests": [
        {
          "image": {
            "content": target.toDataURL().split(',')[1]
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
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
      console.log(result);
    });
  }

  render() {
    return (
      <div>
        <TextField
          label="Image URL"
          onKeyUp={(e) => this.handleChange(e)}
          margin="normal"
        />
        <div style={{display:'flex', flexDirection: 'row'}}>
          <canvas ref={this.sourceCanvas} id="sourceCanvas"></canvas>
          <canvas ref={this.targetCanvas} id="targetCanvas"></canvas>
        </div>
      </div>
    );
  }
}

export default ImageComponent;