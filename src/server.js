import app from './app/app.js';
import config from './config/index.js';

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});