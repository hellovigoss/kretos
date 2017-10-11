module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'kretos',
      script: 'bin/www',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: 'daimoning.site',
      ref: 'origin/master',
      repo: 'git@github.com:hellovigoss/kretos.git',
      path: '/var/www/kretos',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
