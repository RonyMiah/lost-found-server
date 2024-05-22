import env from 'dotenv';
import path from 'path';

env.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_in: process.env.JWT_EXPIRE,
  jwt_refresh_secret: process.env.JWT_REFRESH_SEECRET,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE,
};
