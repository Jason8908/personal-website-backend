// Create initial user
import { getUserService } from '../app/factories/user.factory.js';
import config from '../config/index.js';

const { initialUser } = config;

const createInitialUser = async () => {
  const userService = getUserService();

  await userService.createUser(initialUser.email, initialUser.password);
};

console.log('[SEED] Creating initial user.');
await createInitialUser();
console.log('[SEED] Initial user created successfully.');