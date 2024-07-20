/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://mockai_owner:FvQRsxw5yPU3@ep-black-king-a59wjqnu.us-east-2.aws.neon.tech/mockai?sslmode=require',
    }
  };

  