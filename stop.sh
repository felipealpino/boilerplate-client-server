#!/bin/bash

if [ "$1" == "dev" ]; then
    echo "Parando serviços de desenvolvimento..."
    pm2 delete dev-application-server
    pm2 delete dev-application-client
elif [ "$1" == "prod" ]; then
    echo "Parando serviços de produção..."
    pm2 delete prod-application-server
    pm2 delete prod-application-client
elif [ "$1" == "all" ]; then
    echo "Parando todos os serviços..."
    pm2 delete all
else
    echo "Argumento inválido. Use 'dev' ou 'prod'."
fi

echo "Serviços parados."
