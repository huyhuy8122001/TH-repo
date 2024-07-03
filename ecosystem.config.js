module.exports = {
  apps: [
    {
      name: "my-new-app",
      script: "app.js",
      instance_var: "INSTANCE_ID",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        LOGLEVEL: "info",
        HTTP_PORT: 3001,
        JAMBONZ_ACCOUNT_SID: "0e81dc10-36af-4afc-8fc2-3d7cc2bd97b5",
        JAMBONZ_API_KEY: "0a16eac5-23a0-43d6-8b31-e9dead6ac658",
        JAMBONZ_REST_API_BASE_URL: "https://cpaas61.epacific.net/api/v1",
        WEBHOOK_SECRET: "wh_secret_abNGvoHrH44mQeAFMoPXjy",
        HTTP_PASSWORD: "",
        HTTP_USERNAME: "",
      },
    },
  ],
};
