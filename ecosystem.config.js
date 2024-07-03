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
        JAMBONZ_ACCOUNT_SID: "f9b7d192-ad2f-418f-a5ad-cb9d1e585778",
        JAMBONZ_API_KEY: "6895b589-ce6b-4e3c-93b0-bc70f4e6c746",
        JAMBONZ_REST_API_BASE_URL: "https://cpaas61.epacific.net/api/v1",
        WEBHOOK_SECRET: "wh_secret_wz4gej6hnrA1SxFBhLa8pw",
        HTTP_PASSWORD: "",
        HTTP_USERNAME: "",
      },
    },
  ],
};
