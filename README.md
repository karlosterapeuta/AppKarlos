# Sistema MuseTera

Sistema de gerenciamento para Musicoterapeutas desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

- Gestão de pacientes
- Avaliações e relatórios
- Agenda de atendimentos
- Biblioteca de recursos
- Escala DEMUCA para avaliação TEA
- Geração de PDFs

## Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM com SQLite
- NextAuth.js
- PDF Generation

## Instalação Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
4. Execute o setup do banco de dados:
```bash
npm run setup
```
5. Execute o projeto:
```bash
npm run dev
```

## Deploy no Netlify

1. Faça fork ou clone do repositório
2. Conecte o repositório ao Netlify
3. Configure as seguintes variáveis de ambiente no Netlify (Settings > Build & Deploy > Environment variables):

```
PRISMA_SQLITE_DB_PATH="file:./.next/sqlite/prisma.db"
NEXTAUTH_URL="https://seu-site.netlify.app"
NEXTAUTH_SECRET="sua-chave-secreta"
```

4. O script de setup do SQLite será executado automaticamente durante o build
5. Deploy o projeto no Netlify

### Troubleshooting

Se encontrar erros de banco de dados:

1. Verifique se o diretório .next/sqlite existe e tem permissões corretas
2. Confirme se as variáveis de ambiente estão configuradas corretamente
3. Verifique os logs do build no Netlify para possíveis erros
4. Teste a conexão localmente antes do deploy

## Licença

Este projeto é privado e proprietário. Todos os direitos reservados.
