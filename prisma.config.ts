import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? (() => {
      throw new Error('DATABASE_URL environment variable is not set. See .env.example for setup instructions.');
    })(),
  },
});
