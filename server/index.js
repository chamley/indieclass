const express = require('express');
const router = require('./router');
const cors = require('cors');
const { sequelize } = require('./models/index');
const app = express();

PORT = process.env.PORT || 3001;

app.use(cors()); // TODO: Check for additional parameters into CORS
app.use(express.json());
app.use(router);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`); // eslint-disable-line no-console
    });
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();