# Achou Levou Flow

Painel responsivo hospedado no GitHub Pages. Cadastro manual de produtos, filtros de preço/comissão/nota/frete, revisão com aprovação ou rejeição e exportação/importação JSON.

## Estado atual

- Produtos e aprovações são salvos no localStorage do navegador. Não há sincronização entre dispositivos; use exportação/importação.
- Dados comerciais não são simulados. Não há integração executável com Shopee, Meta ou Metricool nesta versão.
- Nenhuma publicação externa é enviada. Aprovação não significa agendamento ou publicação.
- O site no GitHub Pages não possui autenticação de proprietária. Os dados inseridos ficam no navegador, não no repositório.
- Não digite credenciais no painel nem inclua secrets no código. GitHub Pages serve arquivos estáticos e não executa um servidor de APIs.

## Desenvolvimento

Execute `npm run dev` e abra http://localhost:8080. Requer Python 3 para servir os arquivos estáticos. Não há dependências npm.

## Implantação

O workflow `.github/workflows/pages.yml` publica somente `public/`. Os nomes dos artefatos incluem run_id e run_attempt para evitar colisões em novas tentativas.

As migrações e `.dev.vars.example` remanescentes são arquivos legados e não são usados pelo painel. Nenhuma credencial configurada anteriormente foi alterada.
