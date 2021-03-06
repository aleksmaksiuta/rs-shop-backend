require('dotenv').config();
const express = require('express');
const axios = require('axios').default;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

const urlModifiers = {
  cart: (originalUrl, recipientUrl) => {
    const [,,...rest] = originalUrl.split('/')
    return `${recipientUrl}/${rest.join('/')}`;
  }
}

app.all('/*', (req, res) => {
  const recipient = req.originalUrl.split('/')[1];

  const recipientUrl = process.env[recipient];

  if (!recipientUrl) {
    res.status(502).json({ error: 'Cannot process request' });
  } else {
    const urlModifier = urlModifiers[recipient];
    const url = urlModifier ? urlModifier(req.originalUrl, recipientUrl) : `${recipientUrl}${req.originalUrl}`;

    const config = {
      method: req.method,
      url,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };

    axios(config)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        if (!error.response) {
          res.status(500).json({ error: error.message });
        } else {
          const {
            status,
            data,
            statusCode,
          } = error.response;

          res.status(status || statusCode).json(data);
        }
      });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 App is running on ${PORT} port`);
});
