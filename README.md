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
- Prisma ORM
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
4. Execute o projeto:
```bash
npm run dev
```

## Deploy no Netlify

1. Faça fork ou clone do repositório
2. Conecte o repositório ao Netlify
3. Configure as seguintes variáveis de ambiente no Netlify (Settings > Build & Deploy > Environment variables):

```
DATABASE_URL="sua-url-do-banco-de-dados-supabase"
DIRECT_URL="sua-url-direta-do-banco-de-dados-supabase"
NEXTAUTH_URL="url-do-seu-site-no-netlify"
NEXTAUTH_SECRET="sua-chave-secreta"
NEXT_PUBLIC_SUPABASE_URL="sua-url-do-supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima-do-supabase"
```

4. Certifique-se de que as URLs do banco de dados (DATABASE_URL e DIRECT_URL) estejam corretas e acessíveis
5. Deploy o projeto no Netlify

### Troubleshooting

Se encontrar erros de conexão com o banco de dados:

1. Verifique se as credenciais do Supabase estão corretas
2. Confirme se o IP do Netlify está liberado no Supabase
3. Verifique se as variáveis de ambiente estão configuradas corretamente
4. Teste a conexão localmente antes do deploy

## Licença

Este projeto é privado e proprietário. Todos os direitos reservados.
