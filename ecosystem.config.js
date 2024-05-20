module.exports = {
  apps: [
    /** PRODUCTION */
    {
      name: 'prod-application-server',
      script: 'yarn build && yarn start',
      cwd: './server/', // Define o diretório de trabalho corrente para o serviço
      env: {
        NODE_ENV: 'production',
        PORT: 4001 // Porta diferente para ambiente de produção
      }
    },
    {
      name: 'prod-application-client',
      script: 'yarn build && client/node_modules/vite/bin/vite.js',
      env: {
        VITE_NODE_ENV: 'production',
        PORT: 4000 // Porta diferente para ambiente de produção
      }
    },

    /** DEVELOPMENT */
    {
      name: 'dev-application-client',
      script: 'yarn dev',
      // args: 'dev',
      cwd: './client/', // Define o diretório de trabalho corrente para o serviço
      watch: ['src'],
      ignore_watch: ['node_modules'],
      env: {
        VITE_NODE_ENV: 'development',
        PORT: 3000 // Porta para ambiente de desenvolvimento
      }
    },
    {
      name: 'dev-application-server',
      script: 'yarn dev',
      // args: 'dev',
      cwd: './server/', // Define o diretório de trabalho corrente para o serviço
      watch: ['src'],
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
        PORT: 3001 // Porta para ambiente de desenvolvimento
      }
    },

  ]
};
