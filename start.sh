#!/bin/bash

if [ "$1" == "prod" ]; then
    echo "Iniciando em modo de produção..."
    pm2 start ecosystem.config.js --only prod-dashboard-server 
    pm2 start ecosystem.config.js --only prod-dashboard-client
elif [ "$1" == "dev" ]; then
    echo "Iniciando em modo de desenvolvimento..."
    pm2 start ecosystem.config.js --only dev-dashboard-server 
    pm2 start ecosystem.config.js --only dev-dashboard-client
elif [ "$1" == "all" ]; then
    echo "Iniciando todos os serviços..."
    pm2 start ecosystem.config.js
else
    echo "Argumento inválido. Use 'dev' ou 'prod'."
fi
