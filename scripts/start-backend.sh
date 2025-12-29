#!/bin/bash

# Script para verificar e iniciar o backend PDPw com Podman

set -e

echo "🔍 Verificando ambiente Podman..."

# Verifica se Podman está instalado
if ! command -v podman &> /dev/null; then
    echo "❌ Podman não está instalado. Por favor, instale o Podman."
    exit 1
fi

echo "✅ Podman está instalado"

cd /mnt/Dados/projetos/ACT/POCIA/ONS_PoC-PDPW_V2

# Verifica se os containers já estão rodando
if podman ps | grep -q "pdpw-backend"; then
    echo "✅ Backend já está rodando"
    echo ""
    echo "📊 Status dos containers:"
    podman ps --filter "name=pdpw"
    echo ""
    echo "🌐 APIs disponíveis em: http://localhost:5001/api"
    echo "📚 Swagger UI em: http://localhost:5001/swagger"
    exit 0
fi

echo "🚀 Iniciando containers com Podman Compose..."

# Para os containers se estiverem rodando
podman-compose down 2>/dev/null || true

# Inicia os containers
podman-compose up -d

echo "⏳ Aguardando SQL Server inicializar (30s)..."
sleep 30

echo "⏳ Aguardando backend inicializar (20s)..."
sleep 20

echo ""
echo "📊 Status dos containers:"
podman ps --filter "name=pdpw"

echo ""
echo "✅ Backend iniciado com sucesso!"
echo ""
echo "🌐 APIs disponíveis em: http://localhost:5001/api"
echo "📚 Swagger UI em: http://localhost:5001/swagger"
echo ""
echo "📝 Para ver logs do backend:"
echo "   podman logs -f pdpw-backend"
echo ""
echo "📝 Para parar os containers:"
echo "   cd /mnt/Dados/projetos/ACT/POCIA/ONS_PoC-PDPW_V2 && podman-compose down"
