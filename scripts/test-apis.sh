#!/bin/bash

# Script para testar APIs do backend POC PDPw
# Uso: ./scripts/test-apis.sh

set -e

API_BASE="http://localhost:5001/api"
echo "🧪 Testando APIs do Backend POC PDPw"
echo "Base URL: $API_BASE"
echo "=================================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local expected_status=$4
    
    echo -n "Testing $method $endpoint - $description... "
    
    response=$(curl -s -w "%{http_code}" -X $method "$API_BASE$endpoint" -H "Content-Type: application/json" -o /tmp/response.json)
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓${NC} ($response)"
        return 0
    else
        echo -e "${RED}✗${NC} (got $response, expected $expected_status)"
        cat /tmp/response.json 2>/dev/null || echo ""
        return 1
    fi
}

# Contador de testes
total=0
passed=0
failed=0

echo ""
echo "1️⃣  Testando Empresas"
echo "-------------------"
((total++))
if test_endpoint "GET" "/empresas" "Listar empresas" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "2️⃣  Testando Usinas"
echo "------------------"
((total++))
if test_endpoint "GET" "/usinas" "Listar usinas" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "3️⃣  Testando Dados Energéticos"
echo "-------------------------------"
((total++))
if test_endpoint "GET" "/dados-energeticos" "Listar dados energéticos" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "4️⃣  Testando Dados Elétricos"
echo "-----------------------------"
((total++))
if test_endpoint "GET" "/dados-eletricos" "Listar dados elétricos" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "5️⃣  Testando Ofertas Exportação"
echo "--------------------------------"
((total++))
if test_endpoint "GET" "/ofertas-exportacao" "Listar ofertas" "200"; then ((passed++)); else ((failed++)); fi
((total++))
if test_endpoint "GET" "/ofertas-exportacao/pendentes" "Ofertas pendentes" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "6️⃣  Testando Cargas"
echo "--------------------"
((total++))
if test_endpoint "GET" "/cargas" "Listar cargas" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "7️⃣  Testando Previsões Eólicas"
echo "-------------------------------"
((total++))
if test_endpoint "GET" "/previsoes-eolicas" "Listar previsões" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "8️⃣  Testando Ofertas Resposta Voluntária"
echo "------------------------------------------"
((total++))
if test_endpoint "GET" "/ofertas-resposta-voluntaria" "Listar ofertas" "200"; then ((passed++)); else ((failed++)); fi

echo ""
echo "=================================================="
echo "📊 Resultados"
echo "=================================================="
echo "Total de testes: $total"
echo -e "${GREEN}Passou: $passed${NC}"
if [ $failed -gt 0 ]; then
    echo -e "${RED}Falhou: $failed${NC}"
else
    echo -e "${GREEN}Falhou: 0${NC}"
fi

percentage=$((passed * 100 / total))
echo "Taxa de sucesso: $percentage%"

if [ $failed -eq 0 ]; then
    echo -e "\n${GREEN}✓ Todos os testes passaram!${NC}"
    exit 0
else
    echo -e "\n${RED}✗ Alguns testes falharam.${NC}"
    echo "Verifique se o backend está rodando: ./scripts/start-backend.sh"
    echo "Acesse o Swagger para mais detalhes: http://localhost:5001/swagger"
    exit 1
fi
