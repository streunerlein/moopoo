
(function() {
  const config = {
    endpoints: {
      "poopify": "https://europe-west1-moopoo-216507.cloudfunctions.net/poopify"
    },
    poomap: {
      "shit": "poo",
      "Shit": "Poo",
      "blockchain": "that technology over there",
      "(?=.*\\s)AI(?=\\s.*)": "a bunch of if statements"
    }
  };

  const overlay = document.createElement('div');
  const style = `
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow:hidden;
    z-index:1000000;
    background-color:#2b91f1;
  `;
  overlay.style.cssText = style;

  overlay.innerHTML = `<video src="https://serious-coding.biz/laughing-cat-alpha.webm" muted></video>`;

  document.querySelector('body').appendChild(overlay);
  const animation = overlay.querySelector('video');

  animation.style.cssText = `
    height: 300px;
    margin: auto;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  `;
  
  function textNodesUnder(el) {
    let n, a=[], walk=document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while(n = walk.nextNode()) if (n.textContent.trim()) a.push(n);
    return a;
  }

  function inputNodesUnder(el) {
    return Array.prototype.slice.call(el.querySelectorAll("input")).filter(e => e.value && e.value.trim());
  }

  const nodes = textNodesUnder(document).concat(inputNodesUnder(document));
  
  const payload = {
    "type": "text",
    "text": nodes.map(e => {
      if (e.textContent) return e.textContent;
      else if (e.value) return e.value;
      else {
        console.log("Unknown el", e);
        return '';
      }
    }),
    "poomap": config.poomap
  };

  fetch(config.endpoints.poopify, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(pooped => {
      nodes.forEach((el, ix) => {
        if (el.textContent) el.nodeValue = pooped.text[ix];
        else if (el.value) el.value = pooped.text[ix];
        else console.log("Unknown el", el);
      });
      animation.play();
      animation.addEventListener('ended', () => {
        overlay.remove();
      });
    })
})();
