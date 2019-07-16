import config from './config';
import express from 'express';

async function startServer() {
    const app = express();

    console.log(messages.loading)
    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, err => {
        if (err) {
          console.log(err);
          process.exit(1);
          return;
        }
        console.log(messages.connected);
    });
}

const messages = {
  loading: 
          `
==============================================
            Server ${config.name} Loading...
==============================================
          `,
  connected:
          `
==============================================
        Now Listening on Port: ${config.port}
==============================================
          `
}

startServer();