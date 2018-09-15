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
  const { poomap, text } = req.body;

  res.json({ 
    type: 'text',
    poomap,
    text: text.map(
      t => t.split(' ').map(
        word => poomap[word] || word
      ).join(' ')
    ),
  });
};
