(function() {
  const config = {
    endpoints: {
      "poopify": "https://europe-west1-moopoo-216507.cloudfunctions.net/poopify"
    },
    poomap: {
      /* made for https://en.wikipedia.org/wiki/Machine_learning */
      "blockchain": "unnecessary complication",
      "machine intelligence": "overrated technology",
      "artificial intelligence": "a bunch of if statements (AI)",
      "machine learning": "machine slavery",
      "algorithms": "unreadable code",
      "computers": "rocks with lightning",
      "computer": "a rock with lightning",
      "statistical": "out of date",
      "programmed": "broken",
      "data": "random text",
      "predications": "random guesses",

      /* made for https://www.reddit.com/r/linusrants/hot/ */
      rant: "love-speech",
      rants: "love-speeches",
      fart: "look",
      "call your mother a hamster": "congratulate your mother for making you",
      stupidity: "geniousness",
      snuffed: "overwhelmed",
      "fucking asshole": "not the hero we need, but the hero we deserve",
      "real toilet paper": "your code",
      "I won't have splinters and ink up my arse": "projects would be much more innovative",
      "die as babies": "become super popular",
      "stupid to find a tit to suck on": "good to write such code",
      "garbage": "on another level",
      DAMMIT: "MAKE PEACE NOT WAR",
      "either genius, or a seriously diseased mind. I can't quite tell which": "beyond genius",
      clown: "right",


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

  document.querySelector('body').appendChild(overlay);
  
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
