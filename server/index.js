const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

PORT = process.env.PORT || 3001

app.use(cors()) // TODO: Check for additional parameters into CORS
app.use(express.json());
app.use(router);

app.listen(PORT, ()=>{
  console.log(`server listening on http://localhost:${PORT}`); // eslint-disable-line no-console
})