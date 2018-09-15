// this is the code which will be injected into a given page...

(function() {
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.left = 0;
  div.style.color = 'white';
	div.textContent = 'Injected!';
	document.body.appendChild(div);
})();
