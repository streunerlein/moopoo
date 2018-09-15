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

  return text;
}
