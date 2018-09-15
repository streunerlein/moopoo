
(function() {
  const config = {
    endpoints: {
      "poopify": "https://europe-west1-moopoo-216507.cloudfunctions.net/poopify"
    }
  };
  
  function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while(n = walk.nextNode()) a.push(n);
    return a;
  }

  const textNodes = textNodesUnder(document);
  const payload = {
    "type": "text",
    "text": textNodes.map(e => e.data.toLowerCase()),
    "poomap": {
      "shit": "poo"
    }
  };

  fetch(config.endpoints.poopify, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(pooped => textNodes.forEach((el, ix) => el.nodeValue = pooped.text[ix]))
})();
