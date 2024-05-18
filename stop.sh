#!/bin/bash

if [ "$1" == "dev" ]; then
    echo "Parando serviços de desenvolvimento..."
    pm2 delete dev-dashboard-server
    pm2 delete dev-dashboard-client
elif [ "$1" == "prod" ]; then
    echo "Parando serviços de produção..."
    pm2 delete prod-dashboard-server
    pm2 delete prod-dashboard-client
elif [ "$1" == "all" ]; then
    echo "Parando todos os serviços..."
    pm2 delete all
else
    echo "Argumento inválido. Use 'dev' ou 'prod'."
fi

echo "Serviços parados."
