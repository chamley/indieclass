require('dotenv').config();
const express = require('express');
const router = require('./router');
const cors = require('cors');
const { sequelize } = require('./models/index');
const db = require('./models');
const app = express();
const { mockdb } = require('./datamock');

PORT = process.env.PORT || 3001;

app.use(cors()); // TODO: Check for additional parameters into CORS
app.use(express.json());
// public router
// auth middleware - to see if the user is already logged in (if not logged in 500 error)
// private router
app.use(router);

(async () => {
  try {
    await sequelize.sync().then(async () => {
      await mockdb(db).then(() => {
        app.listen(PORT, () => {
          console.log(`server listening on http://localhost:${PORT}`); // eslint-disable-line no-console
        });
      });
    });
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();
