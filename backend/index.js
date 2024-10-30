const express = require('express');
const cors = require('cors');
const sr = require('./routes/s');
const fr = require('./routes/f');
const cr = require('./routes/c');
const db=require('./db')
const app = express();


// Use CORS to allow cross-origin requests
app.use(cors());

app.use(express.json());
app.use('/sc', sr);
app.use('/fc', fr);
app.use('/cc', cr);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
