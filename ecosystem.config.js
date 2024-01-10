module.exports = {
  apps : [{
    name: 'my-new-app',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'info',
      HTTP_PORT: 3001,
      JAMBONZ_ACCOUNT_SID: 'a1c11f9b-e9b7-4c33-93d0-8d01e8137f11',
      JAMBONZ_API_KEY: '3dc935d2-989e-4f9a-bebf-553991a66199',
      JAMBONZ_REST_API_BASE_URL: 'http://cpaas61.hq-devlab.cloud',
      WEBHOOK_SECRET: 'wh_secret_1rxwA8FEcsHcnoCRyiJGRa',
      HTTP_PASSWORD: '',
      HTTP_USERNAME: '',
    }
  }]
};
