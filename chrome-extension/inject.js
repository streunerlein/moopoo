(function() {  
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
    transition:all 0.3s ease;
    opacity:0;
    cursor-pointer:none;
  `;
  overlay.style.cssText = style;

  overlay.innerHTML = `<video src="https://serious-coding.biz/laughing-cat-alpha.webm" muted></video>`;

  const animation = overlay.querySelector('video');

  setTimeout(() => {
    overlay.style.opacity = 1;
    animation.style['transform'] = 'translateX(-50%) translateY(-50%) scale(1)';
  }, 16);

  animation.style.cssText = `
    height: 300px;
    margin: auto;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0);
    transform-origin: center 35%;
    transition:all 0.75s ease 0.2s;
  `;

  const configFrame = document.createElement('iframe');
  configFrame.style.cssText = `
    border:none;
    width:0;
    height:0;
    overflow:hidden;
    opacity:0;
    pointer-events:none;
  `;

  configFrame.addEventListener('load', () => {
    configFrame.contentWindow.addEventListener('message', (msg) => {
      console.log("Received", msg);
      replace();
    });
  });

  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.appendChild(configFrame);

  configFrame.src = "https://moopoo.serious-coding.biz/getconfig.html";
  
  function textNodesUnder(el) {
    let n, a=[], walk=document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while(n = walk.nextNode()) if (n.textContent.trim()) a.push(n);
    return a;
  }

  function inputNodesUnder(el) {
    return Array.prototype.slice.call(el.querySelectorAll("input")).filter(e => e.value && e.value.trim());
  }

  const nodes = textNodesUnder(document).concat(inputNodesUnder(document));
  
  function replace() {
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

    const pooped = poopify(payload.poomap, payload.text);

    nodes.forEach((el, ix) => {
      if (el.textContent) el.nodeValue = pooped.text[ix];
      else if (el.value) el.value = pooped.text[ix];
      else console.log("Unknown el", el);
    });
    animation.play();

    setTimeout(() => {
      overlay.style["transition"] = "all 2s ease 1s";
      animation.style["transition"] = "all 0.3s ease";

      setTimeout(() => {
        overlay.style["background-color"] = '#e4377c';
      }, 16);
    }, 300);

    setTimeout(() => {
      overlay.style["transition"] = "all 1s ease";
      overlay.style.opacity = 0;

      setTimeout(() => {
        overlay.remove();
      }, 2016);
    }, 2000);

    setTimeout(() => {
      animation.style['transform'] = 'translateX(-50%) translateY(-50%) scale(3)';
      animation.style['opacity'] = 0;
    }, 2000);

    animation.addEventListener('ended', () => {

    });
  }

  function poopify(poomap, text) {
    Object.entries(poomap).forEach(([badwordRegExpStr, goodword]) => {
      const reg = new RegExp(badwordRegExpStr, badwordRegExpStr === badwordRegExpStr.toUpperCase() ? 'g' : 'gi');
      text = text.map(t => t.replace(reg, badword => {
        const shouldUppercase = badword[0] === badword[0].toUpperCase();
        return shouldUppercase 
          ? goodword[0].toUpperCase() + goodword.substring(1)
          : goodword;
      }));
    });

    return { type: 'text', poomap, text };
  }
})();
