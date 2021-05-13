import express from 'express';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

const cache: any = {};

app.get('/weather/:city,:country', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  const cached = cache[`${req.params.city},${req.params.country}`];

  if (cached && Date.now() < cached.ttl)
    return res.json({ cached: true, ...cached });

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.country}&appid=${process.env.WEATHER_API_KEY}`
    )
    .then((r) => {
      const d = new Date();
      d.setTime(d.getTime() + 1800000);
      cache[`${req.params.city},${req.params.country}`] = {
        ttl: d.getTime(),
        ...r.data
      };
      res.json(r.data);
    })
    .catch((e) => {
      res.json(e.response.data);
    });
});

app.listen(9001, () => {
  console.log('Started Compass API at http://localhost:9001');
});
