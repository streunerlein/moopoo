/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.poopify = (req, res) => {
  let { poomap, text } = req.body;

  if (!poomap) {
    return res.status(400).json({ message: 'no poomap  provided in body'});
  }
  if (!text) {
    return res.status(400).json({ message: 'no text provided in body'});
  }
  if (!Array.isArray(text)) {
    return res.status(400).json({ message: 'text is not an array' });
  }

  text = text.map(t => {
    Object.entries(poomap).forEach(([badwordRegExpStr, goodword]) => {
      t = t.replace(new RegExp(badwordRegExpStr, 'ig'), badword => {
        const shouldUppercase = badword[0] === badword[0].toUpperCase();
        return shouldUppercase 
          ? goodword[0].toUpperCase() + goodword.substring(1)
          : goodword;
      });
    });
    return t;
  });

  res.json({ type: 'text', poomap, text });
};
